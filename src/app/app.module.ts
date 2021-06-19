import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule, LogLevel, OidcConfigService} from "angular-auth-oidc-client";
import {environment} from "../environments/environment";
import {MenuModule} from "./shared/menu/menu.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './home/books/books.component';
import { SharedModule } from "./shared/shared.module";
import { BookDetailComponent } from './book-detail/book-detail.component';
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { PanelModule } from "primeng/panel";
import { FieldsetModule } from "primeng/fieldset";
import { ConfirmDialogModule } from "primeng/confirmdialog";

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: environment.stsAuthority,
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'angular-client',
      scope: 'openid profile email',
      responseType: 'code',
      logLevel: environment.production ? LogLevel.None : LogLevel.Debug,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    MenuModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastModule,
    PanelModule,
    FieldsetModule,
    ConfirmDialogModule
  ],
  providers: [
    DialogService,
    OidcConfigService,
    MessageService,
    ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
