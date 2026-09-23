export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

export type TaskFilter = 'all' | 'open' | 'done';
