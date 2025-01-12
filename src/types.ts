type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Column = {
  id: TaskStatus;
  title: string;
};

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};
