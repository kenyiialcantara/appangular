import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://api.escuelajs.co/api/v1/auth';

  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<Auth>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
        })
      );
  }

  profile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<User>(`${this.apiUrl}/profile`, {
        // headers: {
        //   Authorization: `Bearer ${this.tokenService.getToken()}`,
        // },
      })
      .pipe(tap((user) => this.user.next(user)));
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()));
  }

  handleLogOut() {
    this.tokenService.removeToken();
  }
}
