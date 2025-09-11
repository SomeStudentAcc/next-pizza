import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPrice } from "./calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const textDetails = `${size} cm, ${mapPizzaType[type]}`;

  const totalPrice = calcTotalPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  return {textDetails, totalPrice}
};
