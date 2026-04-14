import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthResponse, LoginRequest, RegisterRequest} from '../models/auth.model';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {signal, computed} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Auth`;

  private readonly _currentUser = signal<AuthResponse | null>(null);

  public readonly currentUser = this._currentUser.asReadonly()

  public readonly isAuthenticated = computed(() => !!this._currentUser());

  login (credentials : LoginRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/Login`, credentials).pipe(
      tap(response => this._currentUser.set(response)),
        catchError(this.handleError)
    );
  }

  register(user : RegisterRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/Register`, user).pipe(
    tap(response => this._currentUser.set(response)),
      catchError(this.handleError)
    );
  }

  logout():void{
    this._currentUser.set(null);
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "une erreur inconnue est survenue"
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      errorMessage = error.error || `Code : ${error.status}`
    }
    return throwError(() => errorMessage);
  }
}
