import type { Config } from "jest";
import nextJest from "next/jest";

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
  // Añade estas líneas para manejar archivos de estilo y otros archivos estáticos
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // Ignora los archivos de test en la carpeta node_modules
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// createJestConfig es exportado de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js que es asíncrona
export default createJestConfig(config);
