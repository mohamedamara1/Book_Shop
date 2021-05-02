import { SafeResourceUrl } from "@angular/platform-browser";

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public imageurl : SafeResourceUrl;

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
    this.imageurl = src.imageurl;


  }
}
