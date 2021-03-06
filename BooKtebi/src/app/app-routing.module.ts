import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { GeneralsettingsComponent } from './pages/generalsettings/generalsettings.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { BasketComponent } from './components/basket/basket.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemComponent } from './components/item/item.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children :[
      {path:'products', component:NewProductsComponent}
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'loginadmin',
    component: AdminloginComponent,
  },

  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "item",
    component: ItemComponent,
  },
  { path: 'item/:bookId',
   component: ItemComponent },
 //   {path:'generalsettings',
 //{path: '', redirectTo: 'generalsettings', pathMatch: 'full'},
 {path: 'generalsettings', redirectTo: 'generalsettings/profile-settings', pathMatch: 'full'},
  {
    path:'generalsettings',
   component:GeneralsettingsComponent,
  children: [
    {path:'profile-settings', component:ProfileSettingsComponent},
    {path:'payment-method', component:PaymentInfoComponent},
    {path:'delete-account', component:DeleteAccountComponent}
        ]
      },

  { path: 'cart', component: BasketComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
