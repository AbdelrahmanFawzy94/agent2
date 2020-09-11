import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  DriversPaginationResult,
  Pagination, SupportsPaginationResult, SupportUser, User,
} from '../../../../@core/models/data-objects';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  // observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private httpClient: HttpClient) {}

  public getUsers(
    pagination: Pagination
  ): Observable<SupportsPaginationResult> {
    return this.httpClient
      .post('support/users', pagination, options)
      .pipe(
        map((data: SupportsPaginationResult) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public getUser(id:number
  ): Observable<User> {
    return this.httpClient
      .get('support/users/'+id.toString(), options)
      .pipe(
        map((data: User) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public addSupport(
    supportUser: SupportUser
  ): Observable<string> {
    return this.httpClient
      .post('support/insertUser', supportUser, options)
      .pipe(
        map((data: string) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public updateSupport(
    supportUser: SupportUser
  ): Observable<boolean> {
    return this.httpClient
      .post('support/updateUser', supportUser, options)
      .pipe(
        map((data: boolean) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


}
