#!/usr/bin/env tsx
import { createTask, listTasks, completeTask, removeTask } from './service/taskService.js';
import { TaskFilter } from './domain/task.js';

async function main(argv: string[]) {
  const [cmd, ...rest] = argv;
  try {
    if (cmd === 'create') {
      const title = rest.join(' ').trim();
      const t = await createTask(title);
      console.log(JSON.stringify(t, null, 2));
      return;
    }

    if (cmd === 'list' || !cmd) {
      const filter = (rest[0] as TaskFilter) ?? 'all';
      const items = await listTasks(filter);
      console.log(JSON.stringify(items, null, 2));
      return;
    }

    if (cmd === 'complete') {
      const id = rest[0];
      const updated = await completeTask(id);
      console.log(JSON.stringify(updated, null, 2));
      return;
    }

    if (cmd === 'remove') {
      const id = rest[0];
      await removeTask(id);
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
