"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import toast from "react-hot-toast";
import ChoosePizzaForm from "./ChoosePizzaForm";
import ChooseProductForm from "./ChooseProductForm";

interface Props {
  product: ProductWithRelations;
  onSubmit: VoidFunction
}

export default function ProductForm({ product, onSubmit: _onSubmit }: Props) {
  const { addCartItem, loading } = useCartStore();

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success("Товар добавлен в корзину");
      _onSubmit?.()
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
}
