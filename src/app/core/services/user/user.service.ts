import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../api-url';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users?: User[];
  private userUrl = `${apiUrl}/users`;  // URL to web api

  constructor(private http: HttpClient) { }

  getProfile(token: string): Observable<User> {
    const url = `${this.userUrl}/profile`;
    return this.http.get<User>(url, { headers: new HttpHeaders({ 'authorization': token }) })
      .pipe(
        tap(_ => console.log('fetched profile')),
        catchError(this.handleError<User>('Get profile'))
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap((users: User[]) => {
          console.log('fetched users');
          this.users = users;
        }),
        catchError(this.handleError<User[]>('Get users'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
