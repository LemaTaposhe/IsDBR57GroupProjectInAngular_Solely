import {Product} from '../product/product.model'

export interface CartItem {
    cartItemId: number;
    createdOn: string;
    productId: number;
    product: Product; // Ensure this matches the API response structure
    quantity: number;
    price: number;
    cartId: string;
  }
  