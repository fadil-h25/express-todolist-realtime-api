import { UserRole } from "@prisma/client";

export type UserResponse = {};

export type UserResponseForLogin = {
  email: string;
  password: string;
  id: string;
  role: UserRole;
};

export interface UserUpdateMe {
  id: string;
  name: string;
}

export type GetUserByEmailResponse = {
  id: string;
  email: string;
};
