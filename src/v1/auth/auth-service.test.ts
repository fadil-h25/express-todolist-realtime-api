import { AuthService } from "./auth-service";
import { UserService } from "../user/user-service";
import { PrismaClient } from "@prisma/client";
import { Context } from "../../types/context";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../../error/CustomError";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserService: Partial<UserService>;
  let mockPrisma: Partial<PrismaClient>;

  const mockCtx: Context = {
    reqId: "test-req-id",
    route: "/login",
  } as any;

  beforeEach(() => {
    mockUserService = {
      getUserByEmailForLogin: jest.fn(),
    };
    mockPrisma = {} as Partial<PrismaClient>;

    authService = new AuthService(
      mockPrisma as PrismaClient,
      mockUserService as UserService
    );
  });

  describe("login", () => {
    it("should return JWT token for valid credentials", async () => {
      const mockUser = { id: 1, email: "test@example.com", password: "hashed" };
      (mockUserService.getUserByEmailForLogin as jest.Mock).mockResolvedValue(
        mockUser
      );
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mocked-jwt-token");

      const result = await authService.login(mockCtx, {
        email: mockUser.email,
        password: "123456",
      });

      expect(mockUserService.getUserByEmailForLogin).toHaveBeenCalledWith(
        mockCtx,
        mockUser.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed");
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe("mocked-jwt-token");
    });

    it("should throw CustomError if user not found", async () => {
      (mockUserService.getUserByEmailForLogin as jest.Mock).mockResolvedValue(
        null
      );

      await expect(
        authService.login(mockCtx, { email: "x", password: "y" })
      ).rejects.toThrow(CustomError);
    });

    it("should throw CustomError if password mismatch", async () => {
      (mockUserService.getUserByEmailForLogin as jest.Mock).mockResolvedValue({
        id: 1,
        email: "x",
        password: "hashed",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login(mockCtx, { email: "x", password: "wrong" })
      ).rejects.toThrow(CustomError);
    });
  });
});
