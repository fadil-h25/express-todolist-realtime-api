import { TodoResponse } from "../../todo/dto/todo-response";

export type TodolistResponse = {
  id: string;
  title: string;
  description: string | null;
  ownerId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodolistResponseDetails = {
  id: string;
  title: string;
  description: string | null;
  ownerId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  todos: TodoResponse[];
};
