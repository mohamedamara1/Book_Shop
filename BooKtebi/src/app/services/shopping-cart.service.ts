import { Injectable } from "@angular/core";
import { BookService } from "app/services/book.service";
import { StorageService } from "app/services/storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "./delivery-options.service";

const CART_KEY = "cart2";

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  private deliveryOptions: DeliveryOption[];

  public constructor(private storageService: StorageService,
                     private productService: BookService,
                     private deliveryOptionsService: DeliveryOptionsDataService) {
    this.storage = this.storageService.get();
    this.productService.all().subscribe((products) => this.products = products);
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }
  public RemoveItem(product: Product): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      cart.items.push(item);
    }

    item.quantity = 0;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }
  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.productService.getProductById(item.productId).price)
                          .reduce((previous, current) => previous + current, 0);
                   console.log(cart.itemsTotal);
    cart.deliveryTotal = cart.deliveryOptionId ?
                          this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
                          0;
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
 //   console.log(cart.grossTotal)
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }
}
