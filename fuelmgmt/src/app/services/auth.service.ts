import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: {};
  private markupJSON = {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJPbnlla2FjaGkiLCJuYW1lIjoiT255ZWthY2hpIEEgQW55YW53dSIsInJvbGUiOiJBZG1pbiJ9.NQWvUKeuJfQAAKpTLBeSkRMO_ievMuaBMgErFfPJdZ0"
  }
  constructor(private http: HttpClient
) 
  {
  
    const token = localStorage.getItem('token');

    if (token) 
    {
      
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
  private handleErrorObservable (error: Response | any) 
  {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  login(credentials) {
    let url ='http://itbps:8083/serverside/fuelservices/';
    let result = this.markupJSON;
/*
    if (result && result.token) {
      localStorage.setItem('token', result.token);

      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(localStorage.getItem('token'));


      return true;
    } else { return false; }

   */
     
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append('Authorization','ITBPSINC ' + localStorage.getItem('token'));
    //headers.append('Accept','application/json');
  

    let options = new RequestOptions({ headers: headers });
    

      this.http.post(url,JSON.stringify(credentials))
           .subscribe(response=>{

             console.log(JSON.stringify(response));
             let result = JSON.stringify(response);
             return true;
           });
      return false;
    /*
    return this.http.post(url, JSON.stringify(credentials), options)
                   .pipe(catchError(this.handleErrorObservable));


    return this.http.post('http://itbps:8083/serverside/fuelservices', JSON.stringify(credentials)).pipe(map(response =>
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
  */     
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }
}
