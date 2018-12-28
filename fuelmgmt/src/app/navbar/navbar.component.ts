import { Component, OnInit } from '@angular/core';
import {AuthService} from './../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private service: AuthService) { }

  logout() {
     this.service.logout();
  }
}
