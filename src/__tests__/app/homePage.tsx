import ProductsPage from "@/app/page"; // Adjust the path as needed
import { render, screen, waitFor } from "@testing-library/react";

it("renders home page", async () => {
  render(<ProductsPage />); // Renderiza el componente Home

  // Espera a que el texto "RAMA DEV" esté presente en el documento
  await waitFor(() => {
    expect(screen.getByText("RAMA DEV")).toBeInTheDocument();
  });
});
