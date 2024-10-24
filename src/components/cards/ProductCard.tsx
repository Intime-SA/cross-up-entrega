"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check, Clock } from "lucide-react";
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

import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProductCardProps, RelatedProduct } from "@/domain/definitions";
import Image from "next/image";
import { ProductCarousel } from "./ProductCarrousel";
import TimerComponent from "../timer/TimerComponent";
import { startGlobalTimer } from "@/redux/features/timerSlice";

export default function ProductCard({ product }: ProductCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [isLoaded, setIsLoaded] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const discountPercentage = product.shooter.promotionalPrice
    ? Math.round(
        (1 - product.shooter.promotionalPrice / product.shooter.regularPrice) *
          100
      )
    : 0;

  // Funcion para agregar al carrito en state global redux
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.shooter.name,
        name: product.title,
        price: product.shooter.promotionalPrice || product.shooter.regularPrice,
        quantity: 1,
      })
    );

    // SI EL CARRITO ESTA VACIO AL MOMENTO DE HACER UN addToCart(), SE INCIA EL CONTADOR
    if (cartItems.length === 0) {
      dispatch(startGlobalTimer(600)); // Comienza el temporizador con 5 minutos
    }

    // Abrir el popUp, luego de agregar al carrito.
    setIsPopupOpen(true);

    // Notificacion sweetAlert para info de agregar al carrito.
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

  // Funcion para agregar al carrito en state global redux, desde un producto recomendado.
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

  // mientras carga, renderizar skeleton Cards
  if (!isLoaded) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      <Card className="w-full max-w-[300px] mx-auto overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between h-full">
        <CardHeader className="p-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <div className="relative h-[200px] w-full">
            <img
              src={product.shooter.images[0]}
              alt={`${product.shooter.name}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <CardTitle className="text-base sm:text-lg font-semibold mb-2 text-foreground dark:text-white line-clamp-2">
            {product.title}
          </CardTitle>
          <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-2">
            {product.shooter.shortDescription}
          </p>
          <div className="flex flex-wrap items-baseline mb-2 sm:mb-3">
            <span className="text-lg sm:text-xl font-bold text-primary mr-2">
              $
              {product.shooter.promotionalPrice || product.shooter.regularPrice}
            </span>
            {product.shooter.promotionalPrice && (
              <>
                <span className="text-xs text-gray-500 line-through mr-2">
                  ${product.shooter.regularPrice}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {discountPercentage}% OFF
                </Badge>
              </>
            )}
          </div>
          <p className="text-xs text-gray-700 line-clamp-3">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-3 sm:p-4">
          <Button
            className="w-full text-xs sm:text-sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="w-full h-full sm:h-auto sm:w-[90vw] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] p-0 sm:p-6">
          <div className="h-full sm:h-auto overflow-y-auto">
            <DialogHeader className="p-4 sm:p-0">
              <DialogTitle className="flex items-center text-green-600 text-lg sm:text-xl">
                <Check className="mr-2 h-5 w-5" /> Producto añadido al carrito
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 border-b pb-4 px-4 sm:px-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56">
                  <Image
                    src={product.shooter.images[0]}
                    alt={product.title}
                    width={224}
                    height={224}
                    className="rounded-md object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground dark:text-white">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {product.shooter.shortDescription}
                  </p>
                  <div className="mt-2 flex items-center justify-center sm:justify-start">
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      $
                      {product.shooter.promotionalPrice ||
                        product.shooter.regularPrice}
                    </span>
                    {product.shooter.promotionalPrice && (
                      <Badge
                        variant="secondary"
                        className="ml-2 text-xs sm:text-sm"
                      >
                        {discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>
                  {product.shooter.name && (
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                      Modelo: {product.shooter.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center text-xs sm:text-sm text-blue-600 mb-2 mt-4 px-4 sm:px-0">
              <Clock className="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              <TimerComponent />
            </div>
            <div className="mt-4 px-4 sm:px-0">
              <ProductCarousel
                products={product.products}
                handleAddRelatedProduct={handleAddRelatedProduct}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
