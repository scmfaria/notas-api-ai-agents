import fs from 'node:fs/promises';
import path from 'node:path';
import { Task } from '../domain/task.js';
import { ITaskStore } from './taskStore.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');
let queue: Promise<void> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.then(() => undefined, () => undefined);
  return next;
}

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

async function readTasksFromFile(): Promise<Task[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  if (!raw.trim()) return [];

  try {
    const parsed = JSON.parse(raw) as Task[];
    if (!Array.isArray(parsed)) {
      throw new Error('invalid_file');
    }
    return parsed;
  } catch {
    throw new Error('invalid_file');
  }
}

async function writeTasksToFile(tasks: Task[]): Promise<void> {
  await ensureFile();
  const tempFile = `${DATA_FILE}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(tasks, null, 2), 'utf-8');
  await fs.rename(tempFile, DATA_FILE);
}

export class FileTaskStore implements ITaskStore {
  async create(title: string): Promise<Task> {
    return withLock(async () => {
      const tasks = await readTasksFromFile();
      const task: Task = {
        id: crypto.randomUUID(),
        title,
        done: false,
        createdAt: new Date().toISOString(),
      };
      tasks.push(task);
      await writeTasksToFile(tasks);
      return task;
    });
  }

  async list(): Promise<Task[]> {
    return withLock(async () => {
      const tasks = await readTasksFromFile();
      return tasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    });
  }

  async get(id: string): Promise<Task | null> {
    return withLock(async () => {
      const tasks = await readTasksFromFile();
      return tasks.find((task) => task.id === id) ?? null;
    });
  }

  async update(task: Task): Promise<void> {
    return withLock(async () => {
      const tasks = await readTasksFromFile();
      const index = tasks.findIndex((item) => item.id === task.id);
      if (index === -1) {
        throw new Error('not_found');
      }
      tasks[index] = task;
      await writeTasksToFile(tasks);
    });
  }

  async remove(id: string): Promise<void> {
    return withLock(async () => {
      const tasks = await readTasksFromFile();
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) {
        throw new Error('not_found');
      }
      tasks.splice(index, 1);
      await writeTasksToFile(tasks);
    });
  }
}

export const fileTaskStore = new FileTaskStore();
