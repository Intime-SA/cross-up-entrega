"use client";

import { useState, useEffect } from "react";
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

interface ProductListProps {
  initialProducts: Product[];
}

const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(initialProducts);
    setIsLoading(false);
  }, [initialProducts]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
