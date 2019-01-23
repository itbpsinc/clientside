import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
//import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;





  private url = 'http://localhost:8083/serverside/rest/itbps/';

  constructor(private http: HttpClient, private router: Router) {

    const token = localStorage.getItem('token');

    if (token) {

      const jwt = new JwtHelper();
      const isTokenExpired = jwt.isTokenExpired(token);

      if (!isTokenExpired)
        this.currentUser = jwt.decodeToken(token);
      else this.currentUser = null;

    }

  }



  getCurrentUser() {
    let token = localStorage.getItem('token');
    if (!token)
      return null;
    return new JwtHelper().decodeToken('token');
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  getEmployees() {

    return this.http.get(this.url + "employeeList/").pipe(map(response => response));
  }





  login(credentials) {

    return this.http.post(this.url + "authenticate/", JSON.stringify(credentials))
      .pipe(map(response => {

        let result: any = response;

        if (result && result.token) {
          localStorage.setItem('token', result.token);

          let jwt = new JwtHelper();
          let token = localStorage.getItem('token');
          this.currentUser = jwt.decodeToken(token.trim());
          return true;
        }
        else return false;

      }));

    /*
    return this.http.post(this.url, JSON.stringify(credentials),httpOptions)
      .subscribe(response => 
      {
  
        //console.log(response);
        let result:any = response;
        
        if (result && result.token) 
        {
          localStorage.setItem('token', result.token);
          let jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
          return true;
        }
        else return false;
      }); */


  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    //console.log("Token Not Expired? " + tokenNotExpired('token'));
    return tokenNotExpired('token');
  }
}
