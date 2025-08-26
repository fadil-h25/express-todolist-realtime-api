import { UserService } from "./user-service";
import { PrismaClient } from "@prisma/client";
import { Context } from "../../types/context";

// Mock PrismaClient
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
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
