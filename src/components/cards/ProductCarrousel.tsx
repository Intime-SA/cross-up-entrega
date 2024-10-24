"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFail";
import { RelatedProduct } from "@/domain/definitions";

interface ProductCarouselProps {
  products: RelatedProduct[];
  handleAddRelatedProduct: (product: RelatedProduct) => void;
}

export function ProductCarousel({
  products,
  handleAddRelatedProduct,
}: ProductCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px as the breakpoint for mobile
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const renderProductCard = (relatedProduct: RelatedProduct) => (
    <Card className="w-full max-w-[240px] mx-auto overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <CardContent className="flex flex-col items-center p-3 sm:p-4">
        <div className="relative w-[200px] h-[200px] mb-2 sm:mb-3">
          <ImageWithFallback
            src={relatedProduct.images[0]}
            alt={relatedProduct.name}
            width={300}
            height={300}
            className="w-full h-24 sm:h-32 object-cover mb-3 sm:mb-4 rounded-md"
          />
        </div>
        <h5 className="text-xs sm:text-sm font-semibold text-center mb-1 sm:mb-2 line-clamp-2 px-2">
          {relatedProduct.name}
        </h5>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 text-center">
          $
          {(
            relatedProduct.promotionalPrice || relatedProduct.regularPrice
          ).toFixed(2)}
        </p>
        <Button
          size="sm"
          className="w-full text-xs sm:text-sm"
          onClick={() => handleAddRelatedProduct(relatedProduct)}
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Agregar
        </Button>
        {relatedProduct.availableStock <= 5 && (
          <p
            className="text-[10px] sm:text-xs text-red-500 mt-2 text-center w-full"
            aria-live="polite"
          >
            ¡ÚLTIMAS UNIDADES!
          </p>
        )}
      </CardContent>
    </Card>
  );

  const MobileCarousel = (
    <Carousel className="w-full max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto relative">
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((relatedProduct) => (
          <CarouselItem
            key={relatedProduct.id}
            className="pl-2 md:pl-4 basis-[calc(100%-40px)] md:basis-[calc(50%-40px)] lg:basis-[calc(33.33%-40px)]"
          >
            <div className="p-1">{renderProductCard(relatedProduct)}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 flex justify-between">
        <CarouselPrevious className="relative -left-1" />
        <CarouselNext className="relative -right-1" />
      </div>
    </Carousel>
  );

  const DesktopCarousel = (
    <Carousel className="w-full max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
      <CarouselContent>
        {products.map((relatedProduct) => (
          <CarouselItem key={relatedProduct.id}>
            <div className="p-1">{renderProductCard(relatedProduct)}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );

  return isMobile ? MobileCarousel : DesktopCarousel;
}
