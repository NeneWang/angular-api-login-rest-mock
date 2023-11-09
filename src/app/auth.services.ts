import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) { }

  private isAuthenticated = false;
  
  private _authUser$ = new BehaviorSubject<any | null>(null);

  public authUser$ = this._authUser$.asObservable();

  login(payload: LoginPayload): void {
    this.isAuthenticated = true;
    this.httpClient
      .get<any[]>(
        `http://localhost:3000/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (response) => {
          if (!response.length) {
            alert('Usuario o contrasena invalidos');
          } else {
            const authUser = response[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (err) => {
          alert('Error de conexion');
        },
      });
    this.router.navigate(['/dashboard']);

  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}


export interface LoginPayload {
  email: string | null;
  password: string | null;
}
