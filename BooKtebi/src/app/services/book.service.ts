import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IBook } from 'app/interfaces/IBook';
import { IProd } from 'app/interfaces/IProd';
import { Product } from 'app/models/product.model';
import { Observable } from 'rxjs';
import { CachcingServiceBase } from "./caching.service";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BookService extends CachcingServiceBase {

  private _newprods_url : string = 'http://localhost:8000/newprods';
  private _bestselling : string = 'http://localhost:8000/bestselling';
  private _getbookbyid: string = 'htt://localhost:8000/bookid'
  private SERVER_URL = 'http://localhost:8000/';


 // private _testurl : string = "../../assets/fakeapidata/newprods.json"
  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {
    super();

   }
 // private _testurl1 : string = "../../assets/fakeapidata/newprods.json"
  private _testurl : string = "../../assets/fakeapidata/book.json"

  private products: Observable<Product[]>;


  getNewProducts(): Observable<IProd[]>{
   // console.log(this.http.get<NewProd[]>(this._newprods_url))
    return this.http.get<IProd[]>(this._newprods_url);
  }

  getBestSelling(): Observable<IProd[]>{
   // console.log(this.http.get<NewProd[]>(this._newprods_url))
    return this.http.get<IProd[]>(this._bestselling);
  }

  getBookById(id : number): Observable<IBook>{
    return this.http.get<IBook>(this.SERVER_URL+ 'book?bookid=' + id);
  }
  getProductById(id : string): Product{
    const product : Product = {} as Product;

    this.getBookById(Number(id))
    .subscribe( response =>{
    product.id=String(response.id);
    product.name=response.title;
    product.price=response.price;
    product.description=response.description;
    product.imageurl=this.sanitizer.bypassSecurityTrustUrl(response.imageurl);
    //this.sanitizer.bypassSecurityTrustUrl(
  /*  product.updateFrom =updateFrom(src: Product): void {
      product.id = src.id;
      product.name = src.name;
      product.description = src.description;
      product.price = src.price;

    }*/
});
return product;
  }

  getPriceByBookId(id : string): number{
      var product : Product = {} as Product;

    this.getBookById(Number(id))
    .subscribe( response =>{
    product.id=String(response.id);
    product.name=response.title;
    product.price=response.price;
    product.description=response.description;
  /*  product.updateFrom =updateFrom(src: Product): void {
      product.id = src.id;
      product.name = src.name;
      product.description = src.description;
      product.price = src.price;

    }*/
});
console.log(product.price);
return product.price;
  }

  public all(): Observable<Product[]> {
    return this.http.get<Product[]>(this._newprods_url);

  }
}

