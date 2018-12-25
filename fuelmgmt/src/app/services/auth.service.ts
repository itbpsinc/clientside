import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any;
  constructor(private http: Http) 
  { 
    let token = localStorage.getItem('token');
    if (token)
    {
        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(token);

    }
  }

  login(credentials) 
  { 
    return this.http.post('/api/authenticate', JSON.stringify(credentials)).pipe(map(response => 
        {
           let result = response.json();
       
           if (result && result.token) 
           {
               localStorage.setItem('token', result.token);
               let jwt = new JwtHelper();
               this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
 
               return true; 
          }
          else return false; 
       }));
   }

   logout() 
   { 
     localStorage.removeItem('token');
     this.currentUser = null;
   }

    isLoggedIn() 
    { 
      return tokenNotExpired('token');
    }
}
