import { Injectable } from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";

interface User {
  email: string;
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedUser: User | undefined;

  constructor(public oidcSecurityService: OidcSecurityService) { }

  init() {
    this.oidcSecurityService.checkAuth().subscribe(auth =>
      console.log('is authenticated', auth));
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  get isLogged(): boolean {
    let result = false;
    this.oidcSecurityService.isAuthenticated$.subscribe(
      isLogged => result = isLogged);
    return result;
  }

  get loggedUser() {
    this.oidcSecurityService.userData$.subscribe(data => {
      this._loggedUser = {
        ...data,
        id: data?.sub
      };
    })
    return this._loggedUser;
  }
}
