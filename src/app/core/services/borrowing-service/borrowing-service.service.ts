import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../api-url';
import { BorrowingEquipment } from '../../models/borrowing-equipment';

@Injectable({
  providedIn: 'root'
})
export class BorrowingServiceService {
  borrowingEquipments?: BorrowingEquipment[];
  private borrowingEquipmentUrl = `${apiUrl}/borrowing-equipments`;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'authorization': localStorage.getItem('admin_token') as string }),
  };

  constructor(private http: HttpClient) { }

  createBorrowingEquipment(borrowingEquipment: BorrowingEquipment): Observable<BorrowingEquipment> {
    return this.http.post<BorrowingEquipment>(this.borrowingEquipmentUrl, {
      userId: borrowingEquipment.userId._id,
      equipmentId: borrowingEquipment.equipmentId._id,
      fromTime: borrowingEquipment.fromTime,
      toTime: borrowingEquipment.toTime,
      createdAt: borrowingEquipment.createdAt,
      updatedAt: borrowingEquipment.updatedAt
    }, this.httpOptions).pipe(
      tap((equipment: BorrowingEquipment) => {
        console.log(equipment);
        this.borrowingEquipments?.push(equipment);
        alert('This request is accepted successfully.');
      }),
      catchError(this.handleError<BorrowingEquipment>('Create borrowing equipment'))
    );
  }

  getAllBorrowingEquipments(): Observable<BorrowingEquipment[]> {
    return this.http.get<BorrowingEquipment[]>(this.borrowingEquipmentUrl)
      .pipe(
        tap((borrowingEquipments: BorrowingEquipment[]) => {
          console.log('fetched borrowing equipments');
          this.borrowingEquipments = borrowingEquipments;
        }),
        catchError(this.handleError<BorrowingEquipment[]>('Get borrowing equipments', []))
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





  // getUserBorrowingEquipments(): Observable<BorrowingEquipment[]> {
  //   const url = `${this.borrowingEquipmentUrl}/user-borrowing-equipments`
  //   return this.http.get<BorrowingEquipment[]>(url, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('user_token') as string })
  //   })
  //     .pipe(
  //       tap(_ => console.log('fetched borrowing-equipments')),
  //       catchError(this.handleError<BorrowingEquipment[]>('Get borrowing-equipments', []))
  //     );
  // }