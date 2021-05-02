import { Component, OnInit } from '@angular/core';
import { IProd } from 'app/interfaces/IProd';
import { BookService } from 'app/services/book.service';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss']
})
export class BestSellingComponent implements OnInit {

  public bestselling : IProd[];
  private _bestselling_url : string = 'http://localhost:8000/bestselling';


  constructor(private _bookservice : BookService) { }

  ngOnInit(): void {
    this._bookservice.getBestSelling()
        .subscribe( response =>{
      this.bestselling = response;
      console.log(response);
    });
  }

}
