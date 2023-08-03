import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModule } from '../models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }
  isAuthenticed(): boolean {
    if (sessionStorage.getItem('token') != null) {
      return true;
    }
    else {
      return false;
    }
  }
  //Block the access to New user Means redirect to login
  canacess() {
    if (!this.isAuthenticed()) {
      //redirect to login
      this.router.navigate(['/login'])
    }
  }

  //login means access to  redirect to dashboard
  canauthenticate() {
    if (this.isAuthenticed()) {
      //redirect to dashbaord
      this.router.navigate(['/dashboard'])
    }
  }

  userdetails: UserModule = {
   
    Email: undefined,
    // IsActive: undefined,
    UserName: undefined,
    Password: undefined
  }

  register(userdetails: UserModule):Observable<any> {
    //Fire Base Post Api
    //return this.http.get("https://localhost:44346/api/Registration");
    return this.http.post<any>('https://localhost:44388/api/Employee/RegisterLogin',userdetails);
  }
 // register(name: String, email: String, password: String) {
    //Fire Base Post Api
    //return this.http.get("https://localhost:44346/api/Registration");
   // return this.http.post<any>('https://localhost:44388/api/Employee/RegisterLogin',

      // post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWNa1fY6avRt1RxguSjiKQRfGHg8GB_VQ',
      //{ displayName: name, email, password });
 // }
  login(email: string, password: string) {
    return this.http.
      post<{ idToken: string }>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWNa1fY6avRt1RxguSjiKQRfGHg8GB_VQ',
        { email, password });
  }
  storeToken(token: string) {
    sessionStorage.setItem('token', token)
  }
  details() {
    let token = sessionStorage.getItem('token');
    return this.http.post<{ users: Array<{ localId: string, displayname: string }> }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBWNa1fY6avRt1RxguSjiKQRfGHg8GB_VQ',
      { idToken: token }

    );
  }
  RemoveLogout() {
    //Remove Logout
    sessionStorage.removeItem('token');
  }
}
