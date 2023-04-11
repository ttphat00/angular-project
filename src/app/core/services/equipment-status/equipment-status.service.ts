import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../api-url';
import { EquipmentStatus } from '../../models/equipment-status';

@Injectable({
  providedIn: 'root'
})
export class EquipmentStatusService {
  equipmentStatus?: EquipmentStatus[];
  private equipmentStatusUrl = `${apiUrl}/equipment-status`;  // URL to web api

  constructor(private http: HttpClient) { }

  getAllStatus(): Observable<EquipmentStatus[]> {
    return this.http.get<EquipmentStatus[]>(this.equipmentStatusUrl)
      .pipe(
        tap((status: EquipmentStatus[]) => {
          console.log('fetched equipment statuses');
          this.equipmentStatus = status;
        }),
        catchError(this.handleError<EquipmentStatus[]>('Get equipment statuses', []))
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
