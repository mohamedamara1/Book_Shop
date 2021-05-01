import { Component, OnInit } from '@angular/core';
import { BookService } from 'app/services/book.service';
import { IProd } from '../../interfaces/IProd';

export class Newprod{
  constructor(
    public book_id : number,
    public book_title : string,
    public price : number,
    public date_ajout : string,
    public rating : number
  ){

  }
}

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})


export class NewProductsComponent implements OnInit {
  //public newprods : IProd[];
  // private _testurl : string = "../../assets/fakeapidata/newprods.json"

  public newprods : IProd[];
  private _newprods_url : string = 'http://localhost:8000/newprods';

  constructor(private _bookservice : BookService) { }

  ngOnInit(): void {
    this._bookservice.getNewProducts()
        .subscribe( response =>{
      console.log( response);
      this.newprods = response;
    });
  }

 /* getnewprods(){
    this.http.get<any>(this._newprods_url)
    .subscribe( response =>{
      console.log( JSON.parse(response));
      this.newprods = JSON.parse(response);
    })
  }*/

}
