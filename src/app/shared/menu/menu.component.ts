import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadMenuItems();
    this.authService.onChange.subscribe(() => this.loadMenuItems())
  }

  private loadMenuItems() {
    this.menuItems = [
      {
        label: 'Já tenho conta',
        icon: 'pi pi-fw pi-sign-in',
        visible: !this.authService.isLogged,
        command: () => this.authService.login()
      },
      {
        label: 'Novo usuário',
        icon: 'pi pi-fw pi-user',
        visible: !this.authService.isLogged,
        command: () => this.authService.signup()
      },
      {
        label: 'Catálogo',
        icon: 'pi pi-fw pi-book',
        visible: this.authService.isLogged,
        styleClass: 'p-button-danger',
        routerLink: 'catalog'
      },
      {
        label: 'Logoff',
        icon: 'pi pi-fw pi-sign-out',
        visible: this.authService.isLogged,
        styleClass: 'p-button-danger',
        command: () => this.authService.logout()
      },
    ]
  }
}
