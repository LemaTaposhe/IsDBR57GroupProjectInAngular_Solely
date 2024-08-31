import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/Account/registerCustomer';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
