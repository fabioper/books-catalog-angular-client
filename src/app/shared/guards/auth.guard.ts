import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../core/services/auth.service";
import { ToastrService } from "../services/toastr.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { isLogged } = this.authService;
    if (!isLogged) {
      this.toastrService.error('Você precisa estar logado para acessar esta área.')
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
