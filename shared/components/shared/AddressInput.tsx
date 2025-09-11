'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="74ccd6aa6d79ddded1cbe46cd1f90136d9154880"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
