import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { CategoryService } from './category/category.service';
import { RootComponent } from './root/root.component';

import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './Login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component'; 


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    NavComponent,
    // CheckoutComponent,
    UserComponent,
    LoginComponent,
    ProductComponent,
    CartComponent
    // ReactiveFormsModule
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
