import { Task, TaskFilter } from '../domain/task.js';
import { ITaskStore, taskStore } from '../data/taskStore.js';

const store: ITaskStore = taskStore;

export async function createTask(title: string): Promise<Task> {
  if (!title || !title.trim()) {
    throw new Error('invalid_title');
  }
  return store.create(title.trim());
}

export async function listTasks(filter: TaskFilter = 'all'): Promise<Task[]> {
  const all = await store.list();
  if (filter === 'all') return all;
  if (filter === 'open') return all.filter((t) => !t.done);
  return all.filter((t) => t.done);
}

export async function completeTask(id: string): Promise<Task> {
  const task = await store.get(id);
  if (!task) {
    throw new Error('not_found');
  }
  if (task.done) return task;
  task.done = true;
  await store.update(task);
  return task;
}

export async function removeTask(id: string): Promise<void> {
  const task = await store.get(id);
  if (!task) {
    throw new Error('not_found');
  }
  await store.remove(id);
}
