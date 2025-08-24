import express from "express";
import { login, register } from "./auth-controller.js";

const authRoute = express.Router({});

authRoute.post("login", login);
authRoute.post("register", register);
