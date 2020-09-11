import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  SupportAssignment,
  SupportMessage,
} from '../../../../@core/models/data-objects';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomerSupportService {
  constructor(private httpClient: HttpClient) {}

  public sendMessage(supportMessage: SupportMessage): Observable<boolean> {
    return this.httpClient
      .post('support/sendMessage', supportMessage, options)
      .pipe(
        map((data: boolean) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }

  public getAllSupportAssigned(id: number): Observable<SupportAssignment[]> {
    return this.httpClient
      .get('support/getAllSupportAssigned/' + id.toString())
      .pipe(
        map((data: SupportAssignment[]) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Errrorrrr not found!');
        })
      );
  }
}
