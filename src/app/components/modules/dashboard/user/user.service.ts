import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  DriversPaginationResult, DriverUser,
  Pagination, StatusAction, User,
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
export class UserService {

  constructor(private httpClient: HttpClient) {}

  public getDriverUserData(
    id: number
  ): Observable<DriverUser> {
    return this.httpClient

      .get('driver/'+id.toString(), options)
      .pipe(
        map((data: DriverUser) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }

  public acceptRegisteredDriver(
    id: number
  ): Observable<boolean> {
    return this.httpClient

      .get('driver/acceptRegisterDriver/'+id.toString(), options)
      .pipe(
        map((data: boolean) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }

  public updateDriver(
    driver: DriverUser
  ): Observable<boolean> {
    return this.httpClient

      .put('driver',driver ,options)
      .pipe(
        map((data: boolean) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }

  public changeUserStatus(
    statusAction: StatusAction
  ): Observable<boolean> {
    return this.httpClient

      .put('system/changeUserStatus',statusAction ,options)
      .pipe(
        map((data: boolean) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public submitDriverPictures(formData : FormData) : Observable<boolean>{
    //const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    return this.httpClient.post("driver/upload", formData).pipe(
      map((data: boolean) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public getNewDriverUsers(
    pagination: Pagination
  ): Observable<DriversPaginationResult> {
    return this.httpClient
      .post('driver/getNewDriverUsers', pagination, options)
      .pipe(
        map((data: DriversPaginationResult) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


  public getUsers(
    pagination: Pagination
  ): Observable<DriversPaginationResult> {
    return this.httpClient
      .post('driver/Users', pagination, options)
      .pipe(
        map((data: DriversPaginationResult) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


}
