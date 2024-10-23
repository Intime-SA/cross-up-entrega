import ProductList from "@/components/cards/ProductList";
import { getProducts } from "@/data/api/products";

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        WOKI &gt; APP
      </h1>

      <ProductList initialProducts={products} />
    </div>
  );
}
