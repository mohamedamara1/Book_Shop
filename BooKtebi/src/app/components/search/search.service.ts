import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProd } from 'app/interfaces/IProd';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private SERVER_URL = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  private selectedOption = new BehaviorSubject<IProd>({
    id: null,
    name: null,
    price: null,
    date: null,
    stars: null,
  });

  private selectedOptions = new BehaviorSubject<IProd[]>([]);

  option$ = this.selectedOption.asObservable();
  options$ = this.selectedOptions.asObservable();

  isOptionEmpty$: Observable<boolean>;

  isOptionsEmpty$: Observable<boolean>;

  search(q: string): Observable<IProd[]> {
    return this.http.get<IProd[]>(
      this.SERVER_URL + 'products?name_like=' + q
    );
  }

  updateSelectedOption(option: IProd) {
    this.selectedOption.next(option);
  }

  updateSelectedOptions(options: IProd[]) {
    this.selectedOptions.next(options);
  }
}
