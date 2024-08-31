
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import {CheckoutComponent} from './checkout/checkout.component';
import { UserComponent } from './user/user.component';
import {LoginComponent} from './Login/login.component'
import {ProductComponent} from './product/product.component'
import {CartComponent} from './cart/cart.component'



const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to 'products'
  { path: 'products', component: ProductComponent }, // Default route for products
  { path: 'cart', component: CartComponent }, // Cart route{ path: 'home', component: HomeComponent }, // Home route
  // { path: 'category', component: CategoryComponent }, // Category route
  // { path: 'brands', component: BrandComponent }, // Brand route
  // { path: 'division', component: DivisionComponent }, // Division route
  // // { path: 'checkout', component: CheckoutComponent }, // District route
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
