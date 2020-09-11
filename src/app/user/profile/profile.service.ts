import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl: string = 'http://localhost:3000/api/profile';
  constructor(
    private http: HttpClient
  ) { }

  addProfile(data) {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  findAllProfile() {
    return this.http.get(`${this.apiUrl}/`);
  }

  deleteProfile(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProfileById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProfile(id, data) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
