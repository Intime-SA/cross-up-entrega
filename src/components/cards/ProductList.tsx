"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";
import { Product, ProductListProps } from "@/domain/definitions";

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
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-200 max-w-4xl">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
