import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'biblioteca-virtual';

  constructor(private authService: AuthService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.authService.init()
    this.primengConfig.ripple = true;
  }
}
