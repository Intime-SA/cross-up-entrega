"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";

export default function CartComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items) || [];
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? "Your cart is empty."
              : `You have ${totalItems} item(s) in your cart.`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-auto">
          <div className="mt-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-auto pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-lg">Total:</p>
              <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
