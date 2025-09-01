export type TodolistResponse = {
  id: string;
  title: string;
  description: string | null;
  ownerId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};
