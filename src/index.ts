import http from 'node:http';
import { URL } from 'node:url';
import { z } from 'zod';
import { createTask, listTasks, completeTask, removeTask } from './service/taskService.js';
import { TaskFilter } from './domain/task.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const createSchema = z.object({ title: z.string().min(1) });

function json(res: http.ServerResponse, status: number, body: any) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(payload);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '', `http://${req.headers.host}`);

    if (req.method === 'POST' && url.pathname === '/tasks') {
      let body = '';
      for await (const chunk of req) body += chunk;
      const parsed = JSON.parse(body || '{}');
      const data = createSchema.parse(parsed);
      const t = await createTask(data.title);
      return json(res, 201, t);
    }

    if (req.method === 'GET' && url.pathname === '/tasks') {
      const q = (url.searchParams.get('filter') ?? 'all') as TaskFilter;
      const list = await listTasks(q);
      return json(res, 200, list);
    }

    const completeMatch = url.pathname.match(/^\/tasks\/(.+)\/complete$/);
    if (req.method === 'POST' && completeMatch) {
      const id = decodeURIComponent(completeMatch[1]);
      const updated = await completeTask(id);
      return json(res, 200, updated);
    }

    const deleteMatch = url.pathname.match(/^\/tasks\/(.+)$/);
    if (req.method === 'DELETE' && deleteMatch) {
      const id = decodeURIComponent(deleteMatch[1]);
      await removeTask(id);
      return json(res, 204, null);
    }

    json(res, 404, { error: 'not_found' });
  } catch (err: any) {
    if (err?.name === 'ZodError') return json(res, 400, { error: 'invalid_input', details: err.errors });
    if (err?.message === 'not_found') return json(res, 404, { error: 'not_found' });
    if (err?.message === 'invalid_title') return json(res, 400, { error: 'invalid_title' });
    console.error(err);
    json(res, 500, { error: 'internal_error' });
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Notas API listening on http://localhost:${PORT}`);
});
