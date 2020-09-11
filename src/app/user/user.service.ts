import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/api/users';
  constructor(
    private http: HttpClient
  ) { }

    login(data) {
      return this.http.post(`${this.apiUrl}/login`, data);
    }

    register(data) {
      return this.http.post(`${this.apiUrl}/register`, data);
    }

    findAllUser() {
      return this.http.get(`${this.apiUrl}/`);
    }

    isloggedIn() {
      if (!localStorage.getItem('userdata')){
        return false;
      }
      return true;
    }
}
