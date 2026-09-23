import { Task } from '../domain/task.js';

export interface ITaskStore {
  create(title: string): Promise<Task>;
  list(): Promise<Task[]>;
  get(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
  remove(id: string): Promise<void>;
}

export class InMemoryTaskStore implements ITaskStore {
  private tasks = new Map<string, Task>();

  async create(title: string): Promise<Task> {
    const id = crypto.randomUUID();
    const task: Task = {
      id,
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.set(id, task);
    return task;
  }

  async list(): Promise<Task[]> {
    return Array.from(this.tasks.values()).sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  }

  async get(id: string): Promise<Task | null> {
    return this.tasks.get(id) ?? null;
  }

  async update(task: Task): Promise<void> {
    if (!this.tasks.has(task.id)) {
      throw new Error('not_found');
    }
    this.tasks.set(task.id, task);
  }

  async remove(id: string): Promise<void> {
    this.tasks.delete(id);
  }
}

export const taskStore = new InMemoryTaskStore();
