import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../api-url';
import { Request } from '../../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requests?: Request[];
  private requestUrl = `${apiUrl}/requests`;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'authorization': localStorage.getItem('user_token') as string 
    }),
  };

  constructor(private http: HttpClient) { }

  createBorrowingRequest(statusId: string, equipmentId: string, requestTypeId: string): Observable<Request> {
    return this.http.post<Request>(this.requestUrl, { statusId, equipmentId, requestTypeId }, this.httpOptions).pipe(
      tap((request: Request) => {
        console.log(request);
        alert('Send request successfully.');
      }),
      catchError(this.handleError<Request>('Create borrowing request'))
    );
  }

  getAllBorrowingRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.requestUrl)
      .pipe(
        tap((requests: Request[]) => {
          console.log('fetched requests');
          this.requests = requests;
        }),
        catchError(this.handleError<Request[]>('Get requests', []))
      );
  }

  updateRequestStatus(id:string, statusId:string): Observable<Request> {
    const url = `${this.requestUrl}/${id}`;
    return this.http.put<Request>(url, {statusId}, {
      headers: new HttpHeaders({ 'authorization': localStorage.getItem('admin_token') as string })
    }).pipe(
      tap((newRequest: Request) => {
        this.requests = this.requests?.map(request => {
          if(request._id===newRequest._id){
            request.statusId = newRequest.statusId;
          }
          return request;
        });
      }),
      catchError(this.handleError<Request>('Update request status'))
    );
  }

  getUserBorrowingRequests(): Observable<Request[]> {
    const url = `${this.requestUrl}/user-requests`
    return this.http.get<Request[]>(url, this.httpOptions)
      .pipe(
        tap((requests: Request[]) => {
          console.log('fetched user requests');
        }),
        catchError(this.handleError<Request[]>('Get user requests', []))
      );
  }

  deleteBorrowingRequest(id: string): Observable<Request> {
    const url = `${this.requestUrl}/${id}`;

    return this.http.delete<Request>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted request id=${id}`)),
      catchError(this.handleError<Request>('Delete request'))
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
