import { Component, OnInit } from '@angular/core';
import {AuthService} from './../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  driver   = ["Admin", "Driver","Dispatch"];
  dispatch = ["Dispatch","Admin"];
  admin    = ["Admin"];
  mgr      = ["Admin","Manager","Accounting"];
  acct     = ["Admin","Accounting"];



  constructor(private service: AuthService) 
  { 
    
     
  }

  logout() {
     this.service.logout();
  }
}
