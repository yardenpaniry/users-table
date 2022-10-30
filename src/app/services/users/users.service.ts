import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  users() {
    console.log('test') 
    return this.http.get('https://randomuser.me/api/?results=10');
  }
  
}
