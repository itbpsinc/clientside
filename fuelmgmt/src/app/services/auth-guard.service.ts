import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService:AuthService) { }

  canActivate()
  {
     if (this.authService.isLoggedIn)
        return true;
     else
        this.router.navigate(['/login'])
     return false;
  }
}
