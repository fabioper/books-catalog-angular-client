import { Injectable } from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";

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
  public onChange = new Subject();

  constructor(public oidcSecurityService: OidcSecurityService) { }

  init() {
    this.oidcSecurityService.checkAuth().subscribe(auth => {
      console.log('is authenticated', auth);
      this.onChange.next()
      if (auth) this.fetchUser()
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  get isLogged(): boolean {
    let result = false;
    this.oidcSecurityService.isAuthenticated$.subscribe(isLogged => result = isLogged);
    return result;
  }

  get loggedUser() {
    return this._loggedUser;
  }

  get token() {
    return this.oidcSecurityService.getToken();
  }

  signup() {
    window.location.href = `${environment.stsAuthority}/signup?returnUrl=${window.location.origin}`;
  }

  private fetchUser() {
    this.oidcSecurityService.userData$.subscribe(data => {
      this._loggedUser = {
        ...data,
        id: data?.sub
      };
    })
  }
}
