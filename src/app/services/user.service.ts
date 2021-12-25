import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = `${environment.baseUrl}/auth/login`;

  loggedStatus = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private router: Router) {
    this.setLoggedStatus(this.isLogged());
  }

  setLoggedStatus(status: boolean) {
    this.loggedStatus.next(status);
  }

  getLoggedStatus() {
    return this.loggedStatus.asObservable();
  }

  login(body: any) {
    return this.apiService.post(this.loginUrl, body);
  }

  isLogged(): boolean {
    if (this.getToken()) return true;

    return false;
  }

  getToken() {
    const token = localStorage['token'];
    if (!token) return null;

    return `Bearer ${token}`;
  }

  logout() {
    localStorage.clear();
    this.setLoggedStatus(false);
    this.router.navigateByUrl('/auth/login');
  }

  getRoleId() {
    let role_id = localStorage['role_id'];
    if (role_id) return role_id;

    return;
  }

  isAdmin(): boolean {
    let role_id = this.getRoleId();

    return +role_id === 1 ? true : false;
  }

  isEmployee(): boolean {
    let role_id = this.getRoleId();

    return +role_id === 2 ? true : false;
  }

  isClient(): boolean {
    let role_id = this.getRoleId();
    return +role_id === 3 ? true : false;
  }

  getUserName(): String{
    const userName = localStorage['name'];
    return userName ? userName : '';
  }
}
