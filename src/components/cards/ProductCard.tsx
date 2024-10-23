"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Check } from "lucide-react";
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
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageWithFallback } from "./ImageWithFail";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProductCardProps, RelatedProduct } from "@/domain/definitions";

export default function ProductCard({ product }: ProductCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [isLoaded, setIsLoaded] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log("Current cart state:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!isPopupOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPopupOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

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
    MySwal.fire({
      icon: "success",
      title: "Producto añadido al carrito",
      text: `${product.title} ha sido agregado exitosamente`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: "bottom-end",
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
      },
    });
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
    MySwal.fire({
      icon: "success",
      title: "Producto añadido al carrito",
      text: `${relatedProduct.name} ha sido agregado exitosamente`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: "bottom-end",
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
      },
    });
    setIsPopupOpen(false);
  };

  if (!isLoaded) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-2xl hover:scale-105 flex flex-col justify-between h-full">
        <CardHeader className="p-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <div className="relative h-64 w-full">
            <img
              src={product.shooter.images[0]}
              alt={`${product.shooter.name}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold mb-2 text-foreground dark:text-white">
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <Check className="mr-2 h-5 w-5" /> Producto añadido al carrito
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 border-b pb-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={product.shooter.images[0]}
                  alt={product.title}
                  className="h-24 w-24 rounded-md object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.shooter.shortDescription}
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-xl font-bold text-primary">
                    $
                    {product.shooter.promotionalPrice ||
                      product.shooter.regularPrice}
                  </span>
                  {product.shooter.promotionalPrice && (
                    <Badge variant="secondary" className="ml-2">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
                {product.shooter.name && (
                  <p className="mt-1 text-sm text-gray-500">
                    Modelo: {product.shooter.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Combina perfectamente con</h4>
            <div className="text-sm text-blue-600 mb-2">
              {formatTime(timeLeft)}
            </div>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {product.products.map((relatedProduct) => (
                  <CarouselItem key={relatedProduct.id}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col items-center p-6">
                          <ImageWithFallback
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            className="w-full h-32 object-cover mb-4 rounded-md"
                          />

                          <h5 className="text-sm font-semibold text-center mb-2">
                            {relatedProduct.name}
                          </h5>
                          <p className="text-sm text-gray-500 mb-4">
                            $
                            {(
                              relatedProduct.promotionalPrice ||
                              relatedProduct.regularPrice
                            ).toFixed(2)}
                          </p>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() =>
                              handleAddRelatedProduct(relatedProduct)
                            }
                          >
                            <Plus className="w-4 h-4 mr-1" /> Agregar
                          </Button>
                          {relatedProduct.availableStock <= 5 && (
                            <p className="text-xs text-red-500 mt-2">
                              ¡ÚLTIMAS UNIDADES!
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
