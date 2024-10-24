import { render, screen } from "@testing-library/react";
import ProductsPage from "@/app/page"; // Asegúrate de que esta ruta sea correcta
import { getProducts } from "@/data/api/products";

// Mock de la función getProducts
jest.mock("@/data/api/products", () => ({
  getProducts: jest.fn(),
}));

describe("ProductsPage", () => {
  it("should render the h1 element with the correct text and classes", async () => {
    // Castea getProducts como jest.Mock para que TypeScript lo reconozca
    const mockGetProducts = getProducts as jest.Mock;

    // Simula que getProducts devuelve una lista vacía
    mockGetProducts.mockResolvedValueOnce([]);

    // Renderiza la página
    render(await ProductsPage());

    // Verifica que el h1 se renderiza con el texto correcto
    const headingElement = screen.getByRole("heading", {
      name: /WOKI > APP/i, // Usa una expresión regular para coincidir con el texto
    });
    expect(headingElement).toBeInTheDocument();

    // Verifica las clases CSS del h1
    expect(headingElement).toHaveClass(
      "text-3xl",
      "font-bold",
      "mb-8",
      "text-center"
    );
  });
});
