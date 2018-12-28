import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';
import {AuthService} from './../services/auth.service';



@Component({
  selector: 'userlogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin = false;

  constructor(private router: Router,
              private authServices: AuthService) {

  }

  userLogin(credential) {
    /*
     this.authServices.login(credential).subscribe(result=>{
      if (result)
         this.router.navigate(['/']);
      else
         this.invalidLogin = true;
     });
*/
     const result = this.authServices.login(credential);

      if (result) {
         this.router.navigate(['/']);
      } else {
         this.invalidLogin = true;
      }

  }


}
