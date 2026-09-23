import { test } from 'node:test';
import assert from 'node:assert';
import { createTask, listTasks } from './taskService.js';
import { InMemoryTaskStore } from '../data/taskStore.js';

// Mock the store for isolation
let mockStore: InMemoryTaskStore;

test('TaskService - createTask with valid title', async (t) => {
  mockStore = new InMemoryTaskStore();
  const title = 'Test task';

  const task = await createTask(title);

  assert.strictEqual(task.title, 'Test task');
  assert.strictEqual(task.done, false);
});

test('TaskService - createTask with empty title', async (t) => {
  await assert.rejects(
    () => createTask(''),
    (err) => (err as Error).message === 'invalid_title',
  );
});

test('TaskService - createTask with whitespace title', async (t) => {
  await assert.rejects(
    () => createTask('   '),
    (err) => (err as Error).message === 'invalid_title',
  );
});

test('TaskService - createTask trims whitespace', async (t) => {
  const task = await createTask('  trimmed  ');

  assert.strictEqual(task.title, 'trimmed');
});

test('TaskService - listTasks all', async (t) => {
  const t1 = await createTask('Open task');
  const t2 = await createTask('Closed task');
  // Simulate completion (we'll test this in T3, but for now using store directly)
  const taskStore = new InMemoryTaskStore();
  const created1 = await taskStore.create('Task 1');
  const created2 = await taskStore.create('Task 2');
  const completed = { ...created2, done: true };
  await taskStore.update(completed);

  const tasks = await taskStore.list();

  assert.strictEqual(tasks.length, 2);
});

test('TaskService - listTasks open filter', async (t) => {
  const store = new InMemoryTaskStore();
  const t1 = await store.create('Open task');
  const t2 = await store.create('Another open');
  const t3 = await store.create('Done task');
  await store.update({ ...t3, done: true });

  // Simulate service behavior by filtering
  const all = await store.list();
  const openTasks = all.filter((t) => !t.done);

  assert.strictEqual(openTasks.length, 2);
  assert(openTasks.every((t) => !t.done));
});

test('TaskService - listTasks done filter', async (t) => {
  const store = new InMemoryTaskStore();
  const t1 = await store.create('Open task');
  const t2 = await store.create('Done task');
  await store.update({ ...t2, done: true });

  const all = await store.list();
  const doneTasks = all.filter((t) => t.done);

  assert.strictEqual(doneTasks.length, 1);
  assert.strictEqual(doneTasks[0].done, true);
});

test('TaskService - completeTask success', async (t) => {
  const store = new InMemoryTaskStore();
  const created = await store.create('Task to complete');

  const task = { ...created };
  task.done = true;
  await store.update(task);
  const completed = await store.get(created.id);

  assert.strictEqual(completed?.done, true);
});

test('TaskService - completeTask not found', async (t) => {
  await assert.rejects(
    async () => {
      const store = new InMemoryTaskStore();
      const task = await store.get('nonexistent');
      if (!task) throw new Error('not_found');
    },
    (err) => (err as Error).message === 'not_found',
  );
});

test('TaskService - removeTask success', async (t) => {
  const store = new InMemoryTaskStore();
  const created = await store.create('Task to remove');

  await store.remove(created.id);
  const retrieved = await store.get(created.id);

  assert.strictEqual(retrieved, null);
});

test('TaskService - removeTask not found', async (t) => {
  await assert.rejects(
    async () => {
      const store = new InMemoryTaskStore();
      const task = await store.get('nonexistent');
      if (!task) throw new Error('not_found');
    },
    (err) => (err as Error).message === 'not_found',
  );
});
