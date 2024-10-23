"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";

interface RelatedProduct {
  id: string;
  name: string;
  images: string[];
  regularPrice: number;
  promotionalPrice: number | null;
  availableStock: number;
  shortDescription: string;
}

interface ProductCardProps {
  product: {
    title: string;
    shooter: {
      name: string;
      images: string[];
      regularPrice: number;
      promotionalPrice: number | null;
      shortDescription: string;
    };
    products: RelatedProduct[];
    description: string;
    offerExpirationTime: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    console.log("Current cart state:", cartItems);
  }, [cartItems]);

  const discountPercentage = product.shooter.promotionalPrice
    ? Math.round(
        (1 - product.shooter.promotionalPrice / product.shooter.regularPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.shooter.name,
        name: product.title,
        price: product.shooter.promotionalPrice || product.shooter.regularPrice,
        quantity: 1,
      })
    );
    setIsPopupOpen(true);
  };

  const handleAddRelatedProduct = (relatedProduct: RelatedProduct) => {
    dispatch(
      addToCart({
        id: relatedProduct.id,
        name: relatedProduct.name,
        price: relatedProduct.promotionalPrice || relatedProduct.regularPrice,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <Card className="w-full max-w-sm mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <img
              src={product.shooter.images[currentImageIndex]}
              alt={`${product.shooter.name} - Image ${currentImageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.shooter.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) =>
                        (prev - 1 + product.shooter.images.length) %
                        product.shooter.images.length
                    )
                  }
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev + 1) % product.shooter.images.length
                    )
                  }
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold mb-2">
            {product.title}
          </CardTitle>
          <p className="text-sm text-gray-600 mb-4">
            {product.shooter.shortDescription}
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold text-primary">
              $
              {product.shooter.promotionalPrice || product.shooter.regularPrice}
            </span>
            {product.shooter.promotionalPrice && (
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.shooter.regularPrice}
                </span>
                <Badge variant="destructive" className="ml-2">
                  {discountPercentage}% OFF
                </Badge>
              </>
            )}
          </div>
          <p className="text-sm text-gray-700">{product.description}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Producto añadido al carrito</DialogTitle>
            <DialogDescription>
              {product.title} ha sido añadido a tu carrito.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <h4 className="font-semibold">Productos relacionados</h4>
            <div className="grid grid-cols-2 gap-4">
              {product.products.map((relatedProduct) => (
                <div key={relatedProduct.id} className="border p-2 rounded">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover mb-2"
                  />
                  <h5 className="text-sm font-semibold">
                    {relatedProduct.name}
                  </h5>
                  <p className="text-sm text-gray-500">
                    $
                    {(
                      relatedProduct.promotionalPrice ||
                      relatedProduct.regularPrice
                    ).toFixed(2)}
                  </p>
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => handleAddRelatedProduct(relatedProduct)}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Agregar
                  </Button>
                  {relatedProduct.availableStock <= 5 && (
                    <p className="text-xs text-red-500 mt-1">
                      ¡ÚLTIMAS UNIDADES!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
