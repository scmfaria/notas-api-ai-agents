import { beforeEach, test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createTask, listTasks, completeTask, removeTask } from './taskService.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

async function resetFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, '[]', 'utf-8');
}

beforeEach(async () => {
  await resetFile();
});

test('TaskService - createTask with valid title', async () => {
  const title = 'Test task';

  const task = await createTask(title);

  assert.strictEqual(task.title, 'Test task');
  assert.strictEqual(task.done, false);
});

test('TaskService - createTask with empty title', async () => {
  await assert.rejects(
    () => createTask(''),
    (err) => (err as Error).message === 'invalid_title',
  );
});

test('TaskService - createTask with whitespace title', async () => {
  await assert.rejects(
    () => createTask('   '),
    (err) => (err as Error).message === 'invalid_title',
  );
});

test('TaskService - createTask trims whitespace', async () => {
  const task = await createTask('  trimmed  ');

  assert.strictEqual(task.title, 'trimmed');
});

test('TaskService - listTasks all', async () => {
  await createTask('Open task');
  await createTask('Closed task');

  const tasks = await listTasks('all');

  assert.strictEqual(tasks.length, 2);
});

test('TaskService - listTasks open filter', async () => {
  const created = await createTask('Open task');
  await createTask('Another open');
  const task = await completeTask(created.id);

  const openTasks = await listTasks('open');

  assert.strictEqual(openTasks.length, 1);
  assert(openTasks.every((item) => !item.done));
});

test('TaskService - listTasks done filter', async () => {
  const created = await createTask('Done task');
  await completeTask(created.id);

  const doneTasks = await listTasks('done');

  assert.strictEqual(doneTasks.length, 1);
  assert.strictEqual(doneTasks[0].done, true);
});

test('TaskService - completeTask success', async () => {
  const created = await createTask('Task to complete');

  const completed = await completeTask(created.id);

  assert.strictEqual(completed.done, true);
});

test('TaskService - completeTask not found', async () => {
  await assert.rejects(
    () => completeTask('nonexistent'),
    (err) => (err as Error).message === 'not_found',
  );
});

test('TaskService - removeTask success', async () => {
  const created = await createTask('Task to remove');

  await removeTask(created.id);

  const tasks = await listTasks('all');
  assert.strictEqual(tasks.length, 0);
});

test('TaskService - removeTask not found', async () => {
  await assert.rejects(
    () => removeTask('nonexistent'),
    (err) => (err as Error).message === 'not_found',
  );
});
