import { TodoStatus } from "@prisma/client";

export type TodoResponse = {
  id: string;
  title: string;
  status: TodoStatus;
  todolistId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
};
