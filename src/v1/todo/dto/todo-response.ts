export type TodoResponse = {
  id: string;
  title: string;
  isPublic: boolean;
  status: "PENDING" | "PROGRESS" | "COMPLETED";
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};
