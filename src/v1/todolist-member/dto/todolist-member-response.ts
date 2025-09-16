import { TodolistMemberRole } from "@prisma/client";

export type TodolistMemberResponse = {
  id: string;
  role: TodolistMemberRole;
  todolistId: string;
  memberId: string;
};
