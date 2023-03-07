export interface Task {
  task_id: number;
  description: string;
  created_at: Date;
  status_id: number;
}

export type TaskStatus =
  | { id: 1; name: "pending" }
  | { id: 2; name: "in-progress" }
  | { id: 3; name: "finished" };
