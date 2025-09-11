import React from "react";
import { WhiteBlock } from "../shared/white-block";
import { Input } from "../ui";
import { FormTextarea } from "../shared/form-components/form-textarea";
import { AdressInput } from "../shared/AddressInput";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../shared/error-text";

interface Props{
  disabled?: boolean
  className?: string
}

export default function CheckoutAddressForm({disabled}:Props) {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Input name="firstName" className="tetx-base" placeholder="Адрес" />
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => <>
          <AdressInput onChange={field.onChange} />
          {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
          </>}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          rows={5}
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
}
