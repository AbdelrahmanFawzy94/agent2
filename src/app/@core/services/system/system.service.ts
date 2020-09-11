import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  BoxType,
  City,
  Country, CountryPrice, IgnorPerType,
  PaymentType, PenaltyPerType,
  ProductType, RejectPerType,
  StatusAction,
  SystemSetting,
  Vehicle
} from "../../models/data-objects";

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
  providedIn: 'root'
})
export class SystemService {

  constructor(private httpClient: HttpClient) {}

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get('country').pipe(
      map((data: Country[]) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Errrorrrr not found!');
      })
    );
  }

  public getCities(id: number): Observable<City[]> {
    const url: string = 'country/getCitiesByCountry/' + id.toString();
    return this.httpClient.get(url).pipe(
      map((data: City[]) => {
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


  public getVehicles() : Observable<Vehicle[]> {
    return this.httpClient.get("system/vehicles").pipe(
      map((data: Vehicle[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public getBoxTypes() : Observable<BoxType[]> {
    return this.httpClient.get("system/boxTypes").pipe(
      map((data: BoxType[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public getProductTypes() : Observable<ProductType[]> {
    return this.httpClient.get("request/productsTypes").pipe(
      map((data: ProductType[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public getPaymentTypes() : Observable<PaymentType[]> {
    return this.httpClient.get("request/paymentTypes").pipe(
      map((data: PaymentType[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }

  public getCurrentSystemSettings() : Observable<SystemSetting> {
    return this.httpClient.get("system").pipe(
      map((data: SystemSetting) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }

  public getcountriesPrices() : Observable<CountryPrice[]> {
    return this.httpClient.get("system/countriesPrices").pipe(
      map((data: CountryPrice[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }

  public addCountriesPrices( countryPrice : CountryPrice) : Observable<boolean> {
    return this.httpClient.post("system/countriesPrices",countryPrice,options).pipe(
      map((data: boolean) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public getRejectPerTypes() : Observable<RejectPerType[]> {
    return this.httpClient.get("system/rejectPerTypes").pipe(
      map((data: RejectPerType[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public getIgnorePerTypes() : Observable<IgnorPerType[]> {
    return this.httpClient.get("system/ignorePerTypes").pipe(
      map((data: IgnorPerType[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }

  public getPenaltyPerTypes() : Observable<PenaltyPerType[]> {
    return this.httpClient.get("system/penaltyPerTypes").pipe(
      map((data: PenaltyPerType[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


  public saveConfigurations( settings:SystemSetting) : Observable<boolean> {
    return this.httpClient.post("system",settings,options).pipe(
      map((data: boolean) => {
        return data;
      }), catchError( error => {
        return throwError( 'Errrorrrr not found!' );
      })
    );
  }


}
