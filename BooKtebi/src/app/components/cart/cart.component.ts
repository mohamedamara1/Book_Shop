import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/models/cart-item.model';
import { DeliveryOption } from 'app/models/delivery-option.model';
import { Product } from 'app/models/product.model';
import { ShoppingCart } from 'app/models/shopping-cart.model';
import { BookService } from 'app/services/book.service';
import { DeliveryOptionsDataService } from 'app/services/delivery-options.service';
import { ShoppingCartService } from 'app/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';


interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: Product[];
  private cartSubscription: Subscription;

  public constructor(private productsService: BookService,
                     private deliveryOptionService: DeliveryOptionsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public removeProductFromCart(product: Product): void {
    console.log(product);
    this.shoppingCartService.RemoveItem(product);
  }

  public IncrementProduct(book: Product): void {
    this.shoppingCartService.addItem(book, 1);
  }
  public DecrementProduct(book: Product): void {
    this.shoppingCartService.addItem(book, -1);
  }



  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
                           .map((item) => {
                             // const product = this.products.find((p) => p.id === item.productId);
                              const product = this.productsService.getProductById(item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.price * item.quantity };
                           });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
