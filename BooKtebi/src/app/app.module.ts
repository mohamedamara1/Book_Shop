import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralsettingsComponent } from './pages/generalsettings/generalsettings.component';
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { ProductComponent } from './components/product/product.component';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { ItemComponent } from './components/item/item.component';
import { BasketComponent } from './components/basket/basket.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactComponent } from './pages/contact/contact.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { SearchModule } from './components/search/search.module';
import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, GeneralsettingsComponent,
    HomeComponent, HeaderComponent, HeroComponent, NewProductsComponent,ItemComponent,BasketComponent,
    ProductComponent, BestSellingComponent, FooterComponent, LeftBarComponent, ProfileSettingsComponent, PaymentInfoComponent, DeleteAccountComponent, AdminloginComponent, ContactComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
        ReactiveFormsModule,
        IonicModule,
        MDBBootstrapModule.forRoot(),
        NgxPageScrollCoreModule,
        HttpClientModule,
        SearchModule

  ],
  providers: [BookService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
