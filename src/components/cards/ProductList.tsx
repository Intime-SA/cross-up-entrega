"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";

interface Product {
  title: string;
  shooter: {
    id: string;
    name: string;
    images: string[];
    regularPrice: number;
    promotionalPrice: number | null;
    shortDescription: string;
  };
  products: Array<{
    id: string;
    name: string;
    images: string[];
    regularPrice: number;
    promotionalPrice: number | null;
    availableStock: number;
    shortDescription: string;
  }>;
  description: string;
  offerExpirationTime: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data: Product[] = await fetch(
        "https://api.npoint.io/a69824ca4c40ac8e783d"
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setProducts(data);
    };

    fetchData();
  }, []);

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
