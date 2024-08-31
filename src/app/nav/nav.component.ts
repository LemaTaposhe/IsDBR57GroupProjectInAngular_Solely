

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Login/auth.service';
import { CartService } from '../cart/cart.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any; // Stores the logged-in user details
  cartId: string | null = null;
  cartItemCount: number = 0;

  constructor(public authService: AuthService,private router: Router,private cartService: CartService, ) {};
 

  ngOnInit(): void {
    this.loadUser();
    this.updateCartItemCount();
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
 
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  // Load the user details from the AuthService
  loadUser(): void {
    this.user = this.authService.getUser();
    console.log('User:', this.user); // Check if user object is correctly populated
  }

  // Handle logout
  logout(): void {
    this.authService.logout();
    this.loadUser(); // Reset user after logout
  }
  getCartItemCount(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  navigateToCart(): void {
    this.cartService.submitCart().subscribe({
      next: () => this.router.navigate(['/cart']),
      error: err => console.error('Error submitting cart:', err)
    });
  }

  updateCartItemCount(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      console.log('Cart item count:', count); // Debug log
      this.cartItemCount = count;
    });}
}
