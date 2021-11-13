import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email';
import { Reset } from '../models/reset';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private httpClient: HttpClient) { }

  passwordURL = environment.herokuURL + 'api/password';

  public email(email: Email): Observable<any> {
    return this.httpClient.post<any>(this.passwordURL + `/email`, email);
  }


  public reset(reset: Reset): Observable<any> {
    return this.httpClient.post<any>(this.passwordURL + `/reset`, reset);
  }


}
