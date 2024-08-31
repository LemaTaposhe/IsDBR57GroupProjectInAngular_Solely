// // src/app/services/cart.service.ts

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Product } from '../product/product.model';
// import { HttpClient } from '@angular/common/http';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItems: Product[] = [];
//   private cartCountSubject = new BehaviorSubject<number>(0);
//   cartCount$ = this.cartCountSubject.asObservable();

//   private cartApiUrl = 'http://localhost:5000/api/cart/post'; // Your Cart API endpoint
//   private cartItemApiUrl = 'http://localhost:5000/api/cart/post'; // Your CartItem API endpoint

//   constructor(private http: HttpClient) { }

//   addToCart(product: Product): void {
//     const existingProductIndex = this.cartItems.findIndex(item => item.productId === product.productId);
//     if (existingProductIndex > -1) {
//       this.cartItems[existingProductIndex].quantity += product.quantity || 1;
//     } else {
//       this.cartItems.push({ ...product, quantity: product.quantity || 1 });
//     }
//     this.updateCartCount();
//   }

//   private updateCartCount(): void {
//     this.cartCountSubject.next(this.cartItems.length);
//   }

//   getCartItems(): Product[] {
//     return this.cartItems;
//   }

//   getCartItemCount(): Observable<number> {
//     return this.cartCount$;
//   }

//   removeFromCart(productId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.productId !== productId);
//     this.updateCartCount();
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.updateCartCount();
//   }

//   // Method to submit cart and cart items to the backend
//   submitCart(): Observable<void> {
//     const cartId = uuidv4(); // Generate a new UUID for the cart
//     const cartItems = this.cartItems.map(item => ({
//       productId: item.productId,
//       quantity: item.quantity || 1,
//       price: item.price,
//       cartId:  { cartId }
//     }));

//     // Make HTTP requests to insert data
//     return new Observable(observer => {
//       this.http.post<void>(this.cartApiUrl, { cartId }).subscribe({
//         next: () => {
//           this.http.post<void>(this.cartItemApiUrl, cartItems).subscribe({
//             next: () => {
//               this.clearCart(); // Clear the cart after submission
//               observer.next();
//               observer.complete();
//             },
//             error: err => {
//               console.error('Error submitting cart items:', err);
//               observer.error(err);
//             }
//           });
//         },
//         error: err => {
//           console.error('Error creating cart:', err);
//           observer.error(err);
//         }
//       });
//     });
//   }
// }
// src/app/services/cart.service.ts
//----------------------------------------------------------------
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Product } from '../product/product.model';
// import { HttpClient } from '@angular/common/http';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItems: Product[] = [];
//   private cartCountSubject = new BehaviorSubject<number>(0);
//   cartCount$ = this.cartCountSubject.asObservable();

//   private apiUrl = 'http://localhost:5000/api/cart/post'; // Shared Cart and CartItem API endpoint

//   constructor(private http: HttpClient) { }

//   addToCart(product: Product): void {
//     const existingProductIndex = this.cartItems.findIndex(item => item.productId === product.productId);
//     if (existingProductIndex > -1) {
//       this.cartItems[existingProductIndex].quantity += product.quantity || 1;
//     } else {
//       this.cartItems.push({ ...product, quantity: product.quantity || 1 });
//     }
//     this.updateCartCount();
//   }

//   private updateCartCount(): void {
//     this.cartCountSubject.next(this.cartItems.length);
//   }

//   getCartItems(): Product[] {
//     return this.cartItems;
//   }

//   getCartItemCount(): Observable<number> {
//     return this.cartCount$;
//   }

//   removeFromCart(productId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.productId !== productId);
//     this.updateCartCount();
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.updateCartCount();
//   }

//   // Method to submit cart and cart items to the backend
//   submitCart(): Observable<void> {
//     const cartId = uuidv4(); // Generate a new UUID for the cart
//     const cartItems = this.cartItems.map(item => ({
//       productId: item.productId,
//       quantity: item.quantity || 1,
//       price: item.price,
//       cartId: cartId // Use the generated cartId for each cart item
//     }));

//     // Construct the request payload for creating the cart
//     const cartPayload = { cartId };

//     // Construct the request payload for creating cart items
//     const cartItemsPayload = { cartId, items: cartItems };

//     // Make HTTP requests to insert data
//     return new Observable(observer => {
//       this.http.post<void>(this.apiUrl, cartPayload).subscribe({
//         next: () => {
//           this.http.post<void>(this.apiUrl, cartItemsPayload).subscribe({
//             next: () => {
//               this.clearCart(); // Clear the cart after submission
//               observer.next();
//               observer.complete();
//             },
//             error: err => {
//               console.error('Error submitting cart items:', err);
//               observer.error(err);
//             }
//           });
//         },
//         error: err => {
//           console.error('Error creating cart:', err);
//           observer.error(err);
//         }
//       });
//     });
//   }
// }
//-------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../product/product.model';
import {CartItem} from '../cart/cartItem.model'
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private apiUrl = 'http://localhost:5000/api/cart/post'; // Shared Cart and CartItem API endpoint

  constructor(private http: HttpClient) { }

  

  addToCart(product: Product): void {
    const existingProductIndex = this.cartItems.findIndex(item => item.productId === product.productId);
    if (existingProductIndex > -1) {
      this.cartItems[existingProductIndex].quantity += product.quantity || 1;
    } else {
      this.cartItems.push({ ...product, quantity: product.quantity || 1 });
    }
    this.updateCartCount();
  }

  private updateCartCount(): void {
    this.cartCountSubject.next(this.cartItems.length);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getCartItemCount(): Observable<number> {
    return this.cartCount$;
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.updateCartCount();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartCount();
  }

 
  private getStoredCartItems(): Product[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private storeCartItems(cartItems: Product[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }


  // Method to submit cart and cart items to the backend
  submitCart(): Observable<void> {
    const cartId = uuidv4(); // Generate a new UUID for the cart
    const todayDate = new Date().toISOString(); // Get today's date

    // Map cart items to include createDate
    const cartItems = this.cartItems.map(item => ({
      createDate: todayDate, // Add createDate;
      productId: item.productId,
      quantity: item.quantity || 1,
      price: item.price,
      cartId: cartId // Use the generated cartId for each cart item
      
    }));

    // Construct the request payload for creating the cart
    const cartPayload = { cartId };

    // Construct the request payload for creating cart items
    const cartItemsPayload = { cartId, items: cartItems };
    // Save cartId in localStorage
  localStorage.setItem('currentCartId', cartId);

    // Make HTTP requests to insert data
    return new Observable(observer => {
      this.http.post<void>(this.apiUrl, cartPayload).subscribe({
        next: () => {
          this.http.post<void>(this.apiUrl, cartItemsPayload).subscribe({
            next: () => {
            //   this.clearCart(); // Clear the cart after submission
              observer.next();
              observer.complete();
            },
            error: err => {
              console.error('Error submitting cart items:', err);
              observer.error(err);
            }
          });
        },
        error: err => {
          console.error('Error creating cart:', err);
          observer.error(err);
        }
      });
    });
  }
   // Method to get cart items by cartId
//    getCartItemsByCartId(cartId: string): Observable<Product[]> {
//     // Use backticks for string interpolation
//     return this.http.get<Product[]>(`${this.apiUrl}/items/${cartId}`);
//   }

  getLatestCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`http://localhost:5000/api/cart/latest`);
  }

 
}

