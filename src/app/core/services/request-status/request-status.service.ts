import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../api-url';
import { RequestStatus } from '../../models/request-status';

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {
  requestStatus?: RequestStatus[];
  private requestStatusUrl = `${apiUrl}/request-status`;  // URL to web api

  constructor(private http: HttpClient) { }

  getAllStatus(): Observable<RequestStatus[]> {
    return this.http.get<RequestStatus[]>(this.requestStatusUrl)
      .pipe(
        tap((requestStatus: RequestStatus[]) => {
          console.log('fetched request statuses');
          this.requestStatus = requestStatus;
        }),
        catchError(this.handleError<RequestStatus[]>('Get request statuses', []))
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
