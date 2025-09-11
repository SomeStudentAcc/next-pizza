"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui";
import CartDrawerItem from "./CartDrawerItem";
import { getCartItemsDetails } from "@/shared/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { Title } from "./Title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks/useCard";



export default function CartDrawer({ children }) {
const {totalAmount, updateItemQuantity, items, removeCartItem} = useCart()


  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && "justify-center")}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className="font-bold">{items.length} товарв</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col justify-center items-center w-72 mx-auto">
              <Image src={"/empty-box.png"} width={120} height={120} alt="" />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center mb-5 text-neutral-500">
                Добавьте хотя бы одну пиццу что бы совершить заказ
              </p>
              <SheetClose>
                <Button className="w-52 h-12 text-base" size={"lg"}>
                  <ArrowLeft className="w-5 mr-2" />
                  вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1 ">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={
                        item.pizzaSize && item.pizzaType
                          ? getCartItemsDetails(
                              item.ingredients,
                              item.pizzaType as PizzaType,
                              item.pizzaSize as PizzaSize
                            )
                          : ""
                      }
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg  text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-lg">{totalAmount} R</span>
                  </div>

                  <Link href={"/checkout"}>
                    <Button type="submit" className="w-full h-12 text-base">
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
