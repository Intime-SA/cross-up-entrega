import "@testing-library/jest-dom";

declare global {
  // Asegúrate de que `fetch` esté en el contexto global
  interface Window {
    fetch: jest.Mock;
  }
}

export {};
