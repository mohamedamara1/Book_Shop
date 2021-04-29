import { Component, Input, OnInit } from '@angular/core';
import { IProd } from 'app/interfaces/IProd';
import { Newprod } from '../new-products/new-products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() book : IProd;

  constructor() { }
  ngOnInit(): void {
  }
   //function to return list of numbers from 0 to n-1
   numSequence(n: number): Array<number> {
    return Array(n);
  }

}
