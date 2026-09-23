import { test } from 'node:test';
import assert from 'node:assert';
import { InMemoryTaskStore } from './taskStore.js';

test('TaskStore - create', async (t) => {
  const store = new InMemoryTaskStore();

  const task = await store.create('Test task');

  assert.strictEqual(task.title, 'Test task');
  assert.strictEqual(task.done, false);
  assert(task.id, 'Should have id');
  assert(task.createdAt, 'Should have createdAt');
});

test('TaskStore - list empty', async (t) => {
  const store = new InMemoryTaskStore();

  const tasks = await store.list();

  assert.deepStrictEqual(tasks, []);
});

test('TaskStore - list ordered by createdAt', async (t) => {
  const store = new InMemoryTaskStore();

  const t1 = await store.create('Task 1');
  await new Promise((r) => setTimeout(r, 10)); // ensure different timestamps
  const t2 = await store.create('Task 2');

  const tasks = await store.list();

  assert.strictEqual(tasks.length, 2);
  assert.strictEqual(tasks[0].id, t1.id);
  assert.strictEqual(tasks[1].id, t2.id);
});

test('TaskStore - get', async (t) => {
  const store = new InMemoryTaskStore();

  const created = await store.create('Test task');
  const retrieved = await store.get(created.id);

  assert.deepStrictEqual(retrieved, created);
});

test('TaskStore - get not found', async (t) => {
  const store = new InMemoryTaskStore();

  const result = await store.get('nonexistent');

  assert.strictEqual(result, null);
});

test('TaskStore - update', async (t) => {
  const store = new InMemoryTaskStore();

  const created = await store.create('Original');
  const updated = { ...created, done: true, title: 'Updated' };
  await store.update(updated);

  const retrieved = await store.get(created.id);
  assert.deepStrictEqual(retrieved, updated);
});

test('TaskStore - update not found', async (t) => {
  const store = new InMemoryTaskStore();

  const fake = { id: 'fake', title: 'Fake', done: false, createdAt: new Date().toISOString() };

  await assert.rejects(
    () => store.update(fake),
    (err) => (err as Error).message === 'not_found',
  );
});

test('TaskStore - remove', async (t) => {
  const store = new InMemoryTaskStore();

  const created = await store.create('To remove');
  await store.remove(created.id);

  const retrieved = await store.get(created.id);
  assert.strictEqual(retrieved, null);
});
