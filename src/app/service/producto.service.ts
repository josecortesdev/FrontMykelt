import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productURL = environment.herokuURL + 'api/products';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<any> {
    return this.httpClient.get<any>(this.productURL);
  }

  public price(priceId: string): Observable<any> {
    return this.httpClient.get<any>(this.productURL + `/price/${priceId}`);
  }

  public detail(id: string): Observable<any> {
    return this.httpClient.get<any>(this.productURL + `/${id}`);
  }

  public card(): Observable<any> {
    return this.httpClient.get<any>(this.productURL + `/card`);
  }

  public save(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productURL, producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.productURL + `/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productURL + `/${id}`);
  }

}
