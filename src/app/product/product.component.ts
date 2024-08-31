// src/app/components/product/product.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,private cartService: CartService)  { }

  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      // Initialize quantity to 1 for each product
      this.products = data.map(product => ({
        ...product,
        quantity: 1 // Default quantity
      }));
    });
  }

  
  addToCart(product: Product): void {
    // Ensure the quantity is set
    if (product.quantity && product.quantity > 0) {
      this.cartService.addToCart(product);
    }
  }
}
