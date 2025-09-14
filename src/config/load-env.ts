import dotenv from "dotenv";

dotenv.config(); // harus pertama

const testEnv = process.env.TEST;

if (!testEnv) {
  throw new Error("Env not loaded");
}

console.log("TEST:", testEnv); // debug
