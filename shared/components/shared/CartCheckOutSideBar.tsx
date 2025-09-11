import React from "react";
import { WhiteBlock } from "./white-block";
import CheckoutItemDetails from "./CheckoutItemDetails";
import { ArrowRight, Package } from "lucide-react";
import { Button, Skeleton } from "../ui";

interface Props {
  totalAmount: number;
  loading?: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CartCheckOutSideBar({ totalAmount, loading }: Props) {
  const vatPrice = (totalAmount * VAT) / 100;

  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
  return (
    <WhiteBlock className="p-6 top-4 sticky">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="text-[34px] font-extrabold">{totalPrice} R</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" /> Стоимость
            товаров:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} R`
          )
        }
      />
      <CheckoutItemDetails
        title="Налоги:"
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} R`
          )
        }
      />
      <CheckoutItemDetails
        title="Доставка:"
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} R`
          )
        }
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
}
