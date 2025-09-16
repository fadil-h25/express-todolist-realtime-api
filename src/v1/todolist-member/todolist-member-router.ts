import express from "express";
import { handleCreateTodolistMember } from "./todolist-member-controller.js";

export const todolistMemberRouter = express.Router({ mergeParams: true });

todolistMemberRouter.post("", handleCreateTodolistMember);
