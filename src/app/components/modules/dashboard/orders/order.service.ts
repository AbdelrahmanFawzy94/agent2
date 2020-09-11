import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  AgentsPaginationResult, AgentUser,
  DriversPaginationResult, Order, OrdersPaginationResult,
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
export class OrderService {

  constructor(private httpClient: HttpClient) {}

  public getOrders(
    pagination: Pagination
  ): Observable<OrdersPaginationResult> {
    return this.httpClient
      .post('order/Orders', pagination, options)
      .pipe(
        map((data: OrdersPaginationResult) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }

  public getOrder(
    id:number
  ): Observable<Order> {
    return this.httpClient
      .get('order/'+id.toString(), options)
      .pipe(
        map((data: Order) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }


}
