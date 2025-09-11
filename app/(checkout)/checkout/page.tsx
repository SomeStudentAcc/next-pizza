"use client";
import { Container, Title } from "@/shared/components/shared";
import CartCheckOutSideBar from "@/shared/components/shared/CartCheckOutSideBar";
import { CheckoutCart } from "@/shared/components/checkout/checkout-cart";
import { useCart } from "@/shared/hooks/useCard";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutPersonalForm from "@/shared/components/checkout/CheckoutPersonalForm";
import CheckoutAddressForm from "@/shared/components/checkout/CheckoutAddressForm";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/components/checkout/CheckoutFormSchemas";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [submiting, setSubmiting] = useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmiting(true);
      const url = await createOrder(data);
      toast.error("Заказ успешно оформлен");
      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setSubmiting(false);

      toast.error("Не удалось создать заказ");
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-40">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            <div className="w-[450px]">
              <CartCheckOutSideBar
                loading={loading || submiting}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
