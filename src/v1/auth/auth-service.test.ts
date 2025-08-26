// src/v1/auth/auth-service.test.ts
import { AuthService } from "./auth-service";
import { UserService } from "../user/user-service";
import { PrismaClient } from "@prisma/client";
import { Context } from "../../types/context";

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserService: Partial<UserService>;
  let mockPrisma: Partial<PrismaClient>;

  const mockCtx: Context = {
    reqId: "test-req-id",
    route: "/login",
  } as any;

  beforeEach(() => {
    // Mock UserService
    mockUserService = {
      getUserByEmailForLogin: jest
        .fn()
        .mockResolvedValue({ id: 1, email: "test@example.com" }),
    };

    // Mock PrismaClient (tidak dipakai di login saat ini, tapi kita sediakan)
    mockPrisma = {} as Partial<PrismaClient>;

    authService = new AuthService(
      mockPrisma as PrismaClient,
      mockUserService as UserService
    );
  });

  it("should call getUserByEmailForLogin with correct email", async () => {
    const data = { email: "test@example.com" };
    const result = await authService.login(mockCtx, data);

    expect(mockUserService.getUserByEmailForLogin).toHaveBeenCalledTimes(1);
    expect(mockUserService.getUserByEmailForLogin).toHaveBeenCalledWith(
      mockCtx,
      data.email
    );
    expect(result).toEqual({ id: 1, email: "test@example.com" });
  });

  it("should use transaction client if provided", async () => {
    const data = { email: "transaction@example.com" };
    const mockTx = {} as any; // karena login hanya meneruskan db, cukup mock object kosong
    await authService.login(mockCtx, data, mockTx);

    // Pastikan getUserByEmailForLogin tetap dipanggil
    expect(mockUserService.getUserByEmailForLogin).toHaveBeenCalledWith(
      mockCtx,
      data.email
    );
  });
});
