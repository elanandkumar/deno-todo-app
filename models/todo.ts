export interface Todo {
  id: string;
  task: string;
  priority?: string;
  isDone?: boolean;
  added?: Date;
}
