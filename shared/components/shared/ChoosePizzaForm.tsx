/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import { Title } from "./Title";
import { Button } from "../ui";
import PizzaImage from "./PizzaImage";
import GroupVariants from "./GroupVariants";
import {
  mapPizzaType,
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import IngredientItem from "./ingredient";
import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPrice } from "@/shared/lib/calc-total-pizza-price";
import { usePizzaOptions } from "@/shared/hooks/usePizzaOptions";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";

interface Props {
  imageUrl: string;
  name: string;
  loading?: boolean
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId:number, ingredients: number[])=>void
  className?:string
}

export default function ChoosePizzaForm({
  name,
  imageUrl,
  ingredients,
  onSubmit,
  items,
  loading,
  className,
}: Props) {
  const {
    size,
    type,
  
    currentItemId,
    availableSizes,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[350px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients?.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={String(ingredient.price)}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
        loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}R
        </Button>
      </div>
    </div>
  );
}
