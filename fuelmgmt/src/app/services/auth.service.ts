import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: {};
  

  private url = 'http://itbps:8083/serverside/fuellogin';

  constructor(private http: HttpClient) 
  {

    const token = localStorage.getItem('token');

    if (token) {

      const jwt = new JwtHelper();
      const isTokenExpired = jwt.isTokenExpired(token);
      if (!isTokenExpired)
        this.currentUser = jwt.decodeToken(token);
      else this.currentUser = null;

    }

  }


  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  login(credentials) 
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  'ITBPSINC ' + localStorage.getItem('token')
      })
    };

    return this.http.post(this.url, JSON.stringify(credentials),httpOptions)
      .subscribe(response => {

        console.log(response);
        let result:any = response;
        
        if (result && result.token) 
        {
          localStorage.setItem('token', result.token);
          let jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
          return true;
        }
        else return false;
      });
  

  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }
}
