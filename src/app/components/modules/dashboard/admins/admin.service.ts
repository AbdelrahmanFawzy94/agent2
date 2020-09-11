import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  AdminsPaginationResult, AdminUser,
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
export class AdminService {

  constructor(private httpClient: HttpClient) {}

  public getUsers(
    pagination: Pagination
  ): Observable<AdminsPaginationResult> {
    return this.httpClient
      .post('admin/users', pagination, options)
      .pipe(
        map((data: AdminsPaginationResult) => {
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
      .get('admin/users/'+id.toString(), options)
      .pipe(
        map((data: User) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public addAdmin(
    adminUser: AdminUser
  ): Observable<string> {
    return this.httpClient
      .post('admin', adminUser, options)
      .pipe(
        map((data: string) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public updateAdmin(
    adminUser: AdminUser
  ): Observable<boolean> {
    return this.httpClient
      .put('admin', adminUser, options)
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
