import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import { FileTaskStore } from './fileTaskStore.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

async function resetFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, '[]', 'utf-8');
}

test('FileTaskStore - create persists task', async () => {
  await resetFile();
  const store = new FileTaskStore();

  const task = await store.create('Persisted task');

  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  const parsed = JSON.parse(raw) as Array<any>;
  assert.strictEqual(parsed.length, 1);
  assert.strictEqual(parsed[0].title, 'Persisted task');
  assert.strictEqual(task.title, 'Persisted task');
});

test('FileTaskStore - list reads existing tasks', async () => {
  await resetFile();
  const store = new FileTaskStore();
  await store.create('One');
  await store.create('Two');

  const tasks = await store.list();

  assert.strictEqual(tasks.length, 2);
  assert.strictEqual(tasks[0].title, 'One');
  assert.strictEqual(tasks[1].title, 'Two');
});

test('FileTaskStore - update persists changes', async () => {
  await resetFile();
  const store = new FileTaskStore();
  const created = await store.create('Original');

  await store.update({ ...created, done: true, title: 'Updated' });

  const tasks = await store.list();
  assert.strictEqual(tasks[0].title, 'Updated');
  assert.strictEqual(tasks[0].done, true);
});

test('FileTaskStore - remove deletes task', async () => {
  await resetFile();
  const store = new FileTaskStore();
  const created = await store.create('To remove');

  await store.remove(created.id);

  const tasks = await store.list();
  assert.strictEqual(tasks.length, 0);
});

test('FileTaskStore - invalid json throws invalid_file', async () => {
  await resetFile();
  await fs.writeFile(DATA_FILE, '{invalid}', 'utf-8');
  const store = new FileTaskStore();

  await assert.rejects(() => store.list(), (err) => (err as Error).message === 'invalid_file');
});
