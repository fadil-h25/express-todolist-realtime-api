import express from "express";
import { handleCreateTodolistMember } from "./todolist-member-controller.js";

export const todolistMemberRouter = express.Router();

todolistMemberRouter.post("", handleCreateTodolistMember);
