import { TodoStatus } from "@prisma/client";

export type TodoResponse = {
  id: string;
  title: string;
  status: TodoStatus;
  todolistId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoResponseDetails = {
  id: string;
  todolistId: string;
  title: string;
  description: string | null;

  status: TodoStatus;

  createdAt: Date;
  updatedAt: Date;
};
