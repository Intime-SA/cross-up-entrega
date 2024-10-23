import ProductsPage from "@/app/page"; // Ajusta la ruta según sea necesario
import { render, screen } from "@testing-library/react";

it("renders home page", () => {
  render(<ProductsPage />); // Renderiza el componente Home

  // Verifica que el texto "RAMA DEV" esté presente en el documento
  expect(screen.getByText("RAMA DEV")).toBeInTheDocument();
});
