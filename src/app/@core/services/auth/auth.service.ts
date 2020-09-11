import { Injectable } from '@angular/core';
import { SupportUserAccount } from '../../models/data-objects';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // tslint:disable-next-line: no-inferrable-types
  private Token: string = '';

  //  private baseURL = 'http://localhost:5001';
  private baseURL = 'http://sender-api.azurewebsites.net';

  // tslint:disable-next-line: max-line-length
  // const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtb3RheiBhbGkgYWhtZWQiLCJVc2VyVHlwZSI6IkRyaXZlciIsIm5iZiI6MTU5Mzg0MTkwMywiZXhwIjoxNTkzODQ1NTAzLCJpYXQiOjE1OTM4NDE5MDN9.ZkNU5YkOM79qnG7RqPXBqVEti6fjLvjBCimvXCZcZndROan8mazDQszlC2BiiJphFKgCAFwpf3k4mox2arq2Qw";

  constructor() {}

  isUserLogged(): boolean {
    const supportUserAccount = this.getLoggedUser();
    return supportUserAccount != null;
  }

  getUserToken(): string {
    const supportUserAccount = this.getLoggedUser();
    if (supportUserAccount == null) {
      return null;
    }

    return supportUserAccount.token;
  }

  getLoggedUser(): SupportUserAccount {
    const loggedUser: string = localStorage.getItem('LoggedUser');
    const supportUserAccount: SupportUserAccount = JSON.parse(loggedUser);
    return supportUserAccount;
  }

  getBaseURL(): string {
    return this.baseURL;
  }
}
