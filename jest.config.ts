import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Proporciona la ruta de tu app de Next.js para cargar next.config.js y archivos .env
  dir: "./",
});

// Configuración personalizada de Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
  moduleNameMapper: {
    // Configura los alias para resolver rutas como '@/'
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// Exportar la configuración
export default createJestConfig(config);
