// src/app/components/cart/cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product } from '../product/product.model';
import {CartItem} from '../cart/cartItem.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartCount: number = 0;
  // cartItems: Product[] = [];

  cartItems: CartItem[] = [];
  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.loadLatestCartItems();
    // this.cartId = localStorage.getItem('currentCartId') || ''; 
    // this.getStoredCartItems();

    // this.cartService.getLatestCartItem().subscribe(item => {
    //   this.latestCartItem = item;
    // }, error => {
    //   console.error('Error fetching latest cart item:', error);
    // });

  }

  loadLatestCartItems(): void {
    this.cartService.getLatestCartItems().subscribe({
      next: (items: CartItem[]) => {
        this.cartItems = items;
      },
      error: err => {
        console.error('Error fetching cart items:', err.message);
        alert('An error occurred while fetching cart items: ' + JSON.stringify(err));
      }
    });
  }

  
  


  getCartCount(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  private getStoredCartItems(): Product[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  
}
