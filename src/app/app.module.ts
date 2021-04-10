import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroComponent } from './components/hero/hero.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { ProductComponent } from './components/product/product.component';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, HeroComponent, NewProductsComponent, ProductComponent, BestSellingComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule,RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
