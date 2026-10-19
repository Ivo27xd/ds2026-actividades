import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

const env = loadEnv("test", process.cwd(), "");

// Reemplaza el host 'db' de Docker por 'localhost' si corrés los tests en la máquina host
const databaseUrl = (env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/libreria")
  .replace("@db:", "@localhost:");

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests",
      DATABASE_URL: databaseUrl,
    },
  },
});