import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {MenubarModule} from "primeng/menubar";
import {AvatarModule} from "primeng/avatar";
import {MenuModule as PrimeNgMenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule,
    PrimeNgMenuModule,
    ButtonModule,
    InputTextModule
  ]
})
export class MenuModule { }
