import React from "react";
import { WhiteBlock } from "../shared/white-block";
import FormInput from "../shared/form-components/formInput";
import { cn } from "@/shared/lib/utils";

interface Props{
  disabled?: boolean
  className?: string
}

export default function CheckoutPersonalForm({disabled, className}:Props) {
  return (
    <WhiteBlock title="2. Персональные данные" className={cn(className)}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="tetx-base" placeholder="Имя" />
        <FormInput name="lastName" className="tetx-base" placeholder="Фамиоия" />
        <FormInput name="email" className="tetx-base" placeholder="E-Mail" />
        <FormInput name="phone" className="tetx-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
}
