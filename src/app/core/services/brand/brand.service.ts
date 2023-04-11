import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../api-url';
import { Brand } from '../../models/brand';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  brands?: Brand[];
  private authUrl = `${apiUrl}/brands`;  // URL to web api

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.authUrl)
      .pipe(
        tap((brands: Brand[]) => {
          console.log('fetched brands');
          this.brands = brands;
        }),
        catchError(this.handleError<Brand[]>('Get brands', []))
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
