// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { Login } from './login.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor(private http: HttpClient, private router: Router) {
//     const user = JSON.parse(localStorage.getItem('currentUser')!);
//     this.currentUserSubject = new BehaviorSubject<any>(user);
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   login(credentials: Login): Observable<any> {
//     return this.http.post<any>('http://localhost:5000/api/Account/login', credentials)
//       .pipe(
//         map(user => {
//           // Store user details and JWT token in local storage to keep user logged in
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.currentUserSubject.next(user);
//           return user;
//         })
//       );
//   }

//   logout(): void {
//     // Remove user from local storage to log the user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   get currentUserValue(): any {
//     return this.currentUserSubject.value;
//   }

//   isAuthenticated(): boolean {
//     return !!this.currentUserValue;
//   }
// }

//--------------19

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//   private userSubject = new BehaviorSubject<any>(null);

//   constructor() { }

//   // Set user data when the user logs in
//   setUser(user: any): void {
//     this.userSubject.next(user);
//     this.isAuthenticatedSubject.next(true);
//   }

//   // Get user data as an observable
//   getUser(): Observable<any> {
//     return this.userSubject.asObservable();
//   }

//   // Check if the user is authenticated
//   isAuthenticated(): boolean {
//     return this.isAuthenticatedSubject.value;
//   }

//   // Logout the user
//   logout(): void {
//     this.isAuthenticatedSubject.next(false);
//     this.userSubject.next(null);
//     // Additional logic for logging out (e.g., clearing tokens)
//   }
// }
// Example of AuthService

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private user: any = null; // User details stored in service

//   setUser(user: any): void {
//     this.user = user; // Store user details
//     // Optionally store user in localStorage/sessionStorage
//     localStorage.setItem('user', JSON.stringify(user));
//   }

//   getUser(): any {
//     return this.user || JSON.parse(localStorage.getItem('user') || 'null');
//   }

//   isAuthenticated(): boolean {
//     return !!this.getUser();
//   }

//   logout(): void {
//     this.user = null;
//     localStorage.removeItem('user');
//   }
// }

//-----------------19

import { Injectable } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  // Add other user properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser) as User;
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        this.user = null;
      }
    }
  }

  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    return this.user;
  }

  getFullName(): string {
    if (this.user) {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
    return '';
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
  }
}
