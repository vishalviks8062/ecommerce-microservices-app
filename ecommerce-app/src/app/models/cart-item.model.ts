// export interface CartItem {
//   product: {
//     id: number;
//     name: string;
//     price: number;
//     imageUrl: string;
//   };
//   quantity: number;
// }

// export interface CartItem {
//   id: number;  // <-- ADD THIS LINE (cart item ID from backend)
//   product: {
//     id: number;
//     name: string;
//     price: number;
//     imageUrl: string;
//   };
//   quantity: number;
// }

export interface CartItem {
  id?: number;  //  mark as optional
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}