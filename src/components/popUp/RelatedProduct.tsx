"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { Check, Plus } from "lucide-react";

interface RelatedProduct {
  id: string;
  name: string;
  images: string[];
  regularPrice: number;
  promotionalPrice: number | null;
  availableStock: number;
  shortDescription: string;
}

interface RelatedProductsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  addedProduct: {
    name: string;
    image: string;
    price: number;
  };
  relatedProducts: RelatedProduct[];
}

export default function RelatedProductsPopup({
  isOpen,
  onClose,
  addedProduct,
  relatedProducts,
}: RelatedProductsPopupProps) {
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  console.log(addedProduct);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAddRelatedProduct = (product: RelatedProduct) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.promotionalPrice || product.regularPrice,
        quantity: 1,
      })
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-600">
            <Check className="mr-2" /> Producto añadido al carrito
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <img
              src={addedProduct.image}
              alt={addedProduct.name}
              className="w-20 h-20 object-cover"
            />
            <div>
              <h3 className="font-semibold">{addedProduct.name}</h3>
              <p className="text-sm text-gray-500">
                ${addedProduct.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Combina perfectamente con</h4>
            <p className="text-sm text-blue-600 mb-2">{formatTime(timeLeft)}</p>
            <div className="grid grid-cols-2 gap-4">
              {relatedProducts.map((product) => (
                <div key={product.id} className="border p-2 rounded">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-32 object-cover mb-2"
                  />
                  <h5 className="text-sm font-semibold">{product.name}</h5>
                  <p className="text-sm text-gray-500">
                    $
                    {(product.promotionalPrice || product.regularPrice).toFixed(
                      2
                    )}
                  </p>
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => handleAddRelatedProduct(product)}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Agregar
                  </Button>
                  {product.availableStock <= 5 && (
                    <p className="text-xs text-red-500 mt-1">
                      ¡ÚLTIMAS UNIDADES!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
