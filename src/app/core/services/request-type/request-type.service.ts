import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../api-url';
import { RequestType } from '../../models/request-type';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {
  private requestTypeUrl = `${apiUrl}/request-types`;  // URL to web api

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<RequestType[]> {
    return this.http.get<RequestType[]>(this.requestTypeUrl)
      .pipe(
        tap(_ => console.log('fetched request types')),
        catchError(this.handleError<RequestType[]>('Get request types', []))
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
