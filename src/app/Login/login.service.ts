import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:5000/api/Account/login'; // Replace with your actual login endpoint

  constructor(private http: HttpClient) { }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }
}

