import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from 'app/interfaces/IBook';
import { IProd } from 'app/interfaces/IProd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _newprods_url : string = 'http://localhost:8000/newprods';
  private _bestselling : string = 'http://localhost:8000/bestselling';
  private _getbookbyid: string = 'htt://localhost:8000/bookid'
  private SERVER_URL = 'http://localhost:8000/';


 // private _testurl : string = "../../assets/fakeapidata/newprods.json"
  constructor(private http: HttpClient) { }
 // private _testurl1 : string = "../../assets/fakeapidata/newprods.json"
  private _testurl : string = "../../assets/fakeapidata/book.json"


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

}
