// src/app/models/product.model.ts
// src/app/models/product.model.ts

export interface Product {
    productId: number;     // Unique identifier for the product
    name: string;          // Product name
    description: string;   // Product description
    price: number;         // Product price
    thumbnailImage: string; // URL or path to the product image
    quantity: number;      // Quantity input for the product
  }
  