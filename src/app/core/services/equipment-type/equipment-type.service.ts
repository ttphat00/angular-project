import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../api-url';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EquipmentType } from '../../models/equipment-type';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {
  equipmentTypes?: EquipmentType[];
  private authUrl = `${apiUrl}/device-types`;  // URL to web api

  constructor(private http: HttpClient) { }

  getTypes(): Observable<EquipmentType[]> {
    return this.http.get<EquipmentType[]>(this.authUrl)
      .pipe(
        tap((types: EquipmentType[]) => {
          console.log('fetched equipment types');
          this.equipmentTypes = types;

        }),
        catchError(this.handleError<EquipmentType[]>('Get equipment types', []))
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
