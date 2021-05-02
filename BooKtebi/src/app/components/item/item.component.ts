import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'app/services/book.service';
import { IBook } from 'app/interfaces/IBook';
import { map } from 'rxjs/operators'
import { Product } from 'app/models/product.model';
import { ShoppingCartService } from 'app/services/shopping-cart.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public book : IBook;
  public product : Product ={} as Product;
  constructor(
    private _bookservice : BookService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,

  ) { }

  ngOnInit(): void {
    // First get the product id from the current route.

    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('bookId'));

    // Find the product that correspond with the id provided in route.
    console.log(bookIdFromRoute)
    this._bookservice.getBookById(bookIdFromRoute)
        .subscribe( response =>{
        this.product.id=String(response.id);
        console.log(this.product)
        this.product.name=response.title;
        this.product.price=response.price;
        this.product.description=response.description;
        this.book = response;
        console.log(this.product)
    });
  }
  public addProductToCart(book: IBook): void {
    console.log("adding this to cart", this.product)
    this.shoppingCartService.addItem(this.product, 1);
  }
}
