import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  LoginUser,
  SupportUserAccount,
} from '../../../@core/models/data-objects';

// let httpHeaders = new HttpHeaders({
//   'Content-Type' : 'application/json'
// });
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  // observe: 'response'
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public loginUser(loginUser: LoginUser): Observable<SupportUserAccount> {
    return this.httpClient.post('support/login', loginUser, options).pipe(
      map((data: SupportUserAccount) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Errrorrrr not found!');
      })
    );
  }
}
