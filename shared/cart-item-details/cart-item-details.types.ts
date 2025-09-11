
export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  disabled?: boolean
  quantity: number;
}
