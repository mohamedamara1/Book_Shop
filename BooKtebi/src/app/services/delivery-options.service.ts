import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { DeliveryOption } from "../models/delivery-option.model";
import { CachcingServiceBase } from "./caching.service";

@Injectable()
export class DeliveryOptionsDataService extends CachcingServiceBase {
  private deliveryOptions: Observable<DeliveryOption[]>;

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<DeliveryOption[]> {

    return this.http.get<DeliveryOption[]>("http://localhost:8000/newprods");

  }
}
