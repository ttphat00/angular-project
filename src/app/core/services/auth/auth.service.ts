import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Auth } from '../../models/auth';
import { User } from '../../models/user';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${apiUrl}/auth`;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'authorization': localStorage.getItem('admin_token') as string 
    })
  };

  constructor(private http: HttpClient) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(email: string, password: string): Observable<Auth> {
    const url = `${this.authUrl}/login`;
    return this.http.post<Auth>(url, { email, password }).pipe(
      tap((auth: Auth) => {
        if(auth.user.roleId.name === 'Employee'){
          this.redirectUrl = '/';
        }else{
          this.redirectUrl = '/admin';
        }
      }),
      catchError(this.handleError<Auth>('Login'))
    );
  }

  logout(): void {
    this.redirectUrl = '/login';
  }

  createAccount(
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    roleId: string, 
    createdAt: Date
  ): Observable<User> {
    const url = `${this.authUrl}/register`;
    return this.http.post<User>(url, 
      {
        firstName, 
        lastName, 
        email, 
        password, 
        roleId, 
        createdAt
      }, 
      this.httpOptions
      )
      .pipe(
        tap((user: User) => {
          console.log(user);
          alert('Created account successfully.');
          this.redirectUrl = '/admin/accounts';
        }),
        catchError(this.handleError<User>('Create account'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      alert(`${error.error}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
