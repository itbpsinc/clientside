import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { pipe } from 'rxjs';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

import { CanActivate, Router } from '@angular/router';
import { Employee } from '../model/Employee';




@Injectable({
  providedIn: 'root'
})
export class FuelmgtService {

  private url = 'http://localhost:8083/serverside/rest/itbps';

  private getEmployeeUrl = this.url + '/employeeList/';



  constructor(private http: HttpClient, private router: Router) {

  }



  getEmployees(): Observable<Employee[]> {

    return this.http.get(this.getEmployeeUrl)
      .pipe(
        map((response: any) => response.data))
      .catch(this.defaultErrorHandler());

  }




  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }


  private defaultErrorHandler() {
    return (error: any) => {
      console.log(error);
      return Observable.throw(error.json().error || 'Server error')
    };
  }

}