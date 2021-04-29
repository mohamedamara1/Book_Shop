import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'app/services/book.service';
import { IBook } from 'app/interfaces/IBook';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public book : IBook;

  constructor(
    private _bookservice : BookService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // First get the product id from the current route.

    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('bookId'));

    // Find the product that correspond with the id provided in route.
    console.log(bookIdFromRoute)
    this._bookservice.getBookById(bookIdFromRoute)
        .subscribe( response =>{
        console.log( response);
        this.book = response;
    });
  }

}
