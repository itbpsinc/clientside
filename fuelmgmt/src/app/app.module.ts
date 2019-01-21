import { BrowserModule } from '@angular/platform-browser';
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component'; 
import {AuthService} from './services/auth.service'
import { Observable, pipe } from 'rxjs';
import {  mergeMap } from 'rxjs/operators';
import { DispatchComponent } from './dispatch/dispatch.component';
import { DriverComponent } from './driver/driver.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuardService} from './services/auth-guard.service';
import { EmployeeComponent } from './employee/employee.component';
import { AgGridModule } from 'ag-grid-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'ag-grid-enterprise';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import {ErrorDialogComponent}   from './errordialog/errordialog.component';
import {ErrorDialogService}     from './services/error-dialog.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    NoAccessComponent,
    DispatchComponent,
    DriverComponent,
    EmployeeComponent,
    HttpConfigInterceptor,
    ErrorDialogComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'driver', component: DriverComponent },
      { path: 'dispatch', component: DispatchComponent },
      { path: 'admin', component: AdminComponent, canActivate:[AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ])    
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
