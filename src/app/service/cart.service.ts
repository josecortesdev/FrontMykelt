import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  cartURL = environment.herokuURL + 'api/cart';

  public lista(): Observable<Cart[]> {

    return this.httpClient.get<Cart[]>(this.cartURL);
  }

  public save(cart: Cart): Observable<any> {

    return this.httpClient.post<any>(this.cartURL, cart);
  }

  public detail(id: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.cartURL + `/${id}`);
  }

  public update(id: number, cart: Cart): Observable<any> {
    return this.httpClient.put<any>(this.cartURL + `/${id}`, cart);
  }


  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.cartURL + `/${id}`);
  }

}
