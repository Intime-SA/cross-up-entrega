import { getProducts } from "@/data/api/products"; // Importa la función getProducts desde el módulo de productos. Asegúrate de que la ruta sea correcta.

global.fetch = jest.fn(); // Mock de fetch: Reemplaza la función global fetch con una función mock de Jest.

describe("getProducts", () => {
  // Inicia un bloque de pruebas para la función getProducts.
  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba para evitar efectos secundarios.
  });

  it("should fetch products successfully", async () => {
    // Define una prueba para verificar que la función obtenga productos correctamente.
    const mockProducts = [{ id: 1, name: "Product A" }]; // Simula un array de productos que la API debería devolver.

    // Configura el mock de fetch para simular una respuesta exitosa de la API.
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true, // Indica que la respuesta fue exitosa.
      json: jest.fn().mockResolvedValueOnce(mockProducts), // Mockea el método json() para que devuelva mockProducts.
    });

    const products = await getProducts(); // Llama a la función getProducts y espera su resultado.

    // Afirmación: Verifica que fetch fue llamado con la URL de la API correcta.
    expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}`);

    // Afirmación: Verifica que el resultado de getProducts sea igual a mockProducts.
    expect(products).toEqual(mockProducts);
  });

  it("should throw an error when the fetch fails", async () => {
    // Define una prueba para verificar que se maneje correctamente un error en la API.
    // Configura el mock de fetch para simular una respuesta de error.
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false, // Indica que la respuesta no fue exitosa.
    });

    // Afirmación: Verifica que getProducts lance un error cuando la API falla.
    await expect(getProducts()).rejects.toThrow("Failed to fetch products"); // Espera que se lance un error con el mensaje específico.
  });
});
