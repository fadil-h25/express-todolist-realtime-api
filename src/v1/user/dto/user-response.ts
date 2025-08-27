import { UserRole } from "@prisma/client";

export type UserResponse = {};

export type UserResponseForLogin = {
  email: string;
  password: string;
  id: string;
  role: UserRole;
};
