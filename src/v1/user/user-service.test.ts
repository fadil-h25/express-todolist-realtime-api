import { UserService } from "./user-service";
import { PrismaClient, UserRole } from "@prisma/client";
import { Context } from "../../types/context";

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
} as unknown as PrismaClient;

describe("UserService", () => {
  let userService: UserService;
  let ctx: Context;

  beforeEach(() => {
    userService = new UserService(mockPrisma);
    ctx = { reqId: "123", route: "/login" } as Context;
    jest.clearAllMocks();
  });

  describe("getUserByEmailForLogin", () => {
    it("should return user data when user exists", async () => {
      const mockUser = { id: "1", email: "test@example.com" };
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserByEmailForLogin(
        ctx,
        "test@example.com"
      );

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null when user does not exist", async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserByEmailForLogin(
        ctx,
        "notfound@example.com"
      );

      expect(result).toBeNull();
    });
  });

  describe("createUserForRegsiter", () => {
    it("should call prisma.user.create with provided role", async () => {
      const data = {
        email: "new@example.com",
        password: "hashed",
        name: "New User",
        role: "ADMIN" as UserRole,
      };

      await userService.createUserForRegsiter(ctx, data);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data,
      });
    });

    it("should default role to USER if not provided", async () => {
      const data = {
        email: "new@example.com",
        password: "hashed",
        name: "New User",
        role: "USER" as UserRole,
      };

      await userService.createUserForRegsiter(ctx, data);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: { ...data, role: "USER" },
      });
    });
  });
});
