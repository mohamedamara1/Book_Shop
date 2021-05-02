import { Component, Input, OnInit } from '@angular/core';
import { IProd } from 'app/interfaces/IProd';
import { Newprod } from '../new-products/new-products.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() book : IProd;
  image : any;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {

  this.image = this.sanitizer.bypassSecurityTrustUrl( this.book.imageurl);

  }
   //function to return list of numbers from 0 to n-1
   numSequence(n: number): Array<number> {
    return Array(n);
  }

}
