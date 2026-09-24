#!/usr/bin/env tsx

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`http://localhost:3000${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = payload?.error ?? 'request_failed';
    throw new Error(message);
  }

  return payload as T;
}

async function main(argv: string[]) {
  const [cmd, ...rest] = argv;
  try {
    if (cmd === 'create') {
      const title = rest.join(' ').trim();
      const task = await request<any>('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      console.log(JSON.stringify(task, null, 2));
      return;
    }

    if (cmd === 'list' || !cmd) {
      const filter = rest[0] ?? 'all';
      const items = await request<any[]>(`/tasks?filter=${encodeURIComponent(filter)}`);
      console.log(JSON.stringify(items, null, 2));
      return;
    }

    if (cmd === 'complete') {
      const id = rest[0];
      const updated = await request<any>(`/tasks/${encodeURIComponent(id)}/complete`, {
        method: 'POST',
      });
      console.log(JSON.stringify(updated, null, 2));
      return;
    }

    if (cmd === 'remove') {
      const id = rest[0];
      await request<any>(`/tasks/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      console.log('ok');
      return;
    }

    console.log('Usage: cli.ts create <title> | list [all|open|done] | complete <id> | remove <id>');
  } catch (err: any) {
    console.error('Error:', err?.message ?? err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv.slice(2));
}
