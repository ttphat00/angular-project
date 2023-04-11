import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../api-url';
import { Equipment } from '../../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  equipments?: Equipment[];
  private equipmentUrl = `${apiUrl}/equipments`;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'authorization': localStorage.getItem('admin_token') as string }),
  };

  constructor(private http: HttpClient) { }

  addEquipment(formData: FormData): Observable<Equipment> {
    return this.http.post<Equipment>(this.equipmentUrl, formData, this.httpOptions).pipe(
      tap((equipment: Equipment) => {
        console.log(equipment);
        alert('Added Equipment Successfully.');
      }),
      catchError(this.handleError<Equipment>('Add equipment'))
    );
  }

  updateEquipment(id:string, formData: FormData): Observable<Equipment> {
    const url = `${this.equipmentUrl}/${id}`;
    return this.http.put<Equipment>(url, formData, this.httpOptions).pipe(
      tap((newEquipment: Equipment) => {
        console.log(newEquipment);
        this.equipments = this.equipments?.map(equipment => {
          if(equipment._id===newEquipment._id){
            equipment.name = newEquipment.name;
            equipment.description = newEquipment.description;
            equipment.image = newEquipment.image;
            equipment.statusId = newEquipment.statusId;
          }
          return equipment;
        });
        alert('Updated Equipment Successfully.');
      }),
      catchError(this.handleError<Equipment>('Update equipment'))
    );
  }

  updateEquipmentStatus(id:string, statusId:string): Observable<Equipment> {
    const url = `${this.equipmentUrl}/${id}`;
    return this.http.put<Equipment>(url, {statusId}, this.httpOptions).pipe(
      tap((newEquipment: Equipment) => {
        this.equipments = this.equipments?.map(equipment => {
          if(equipment._id===newEquipment._id){
            equipment.statusId = newEquipment.statusId;
          }
          return equipment;
        });
      }),
      catchError(this.handleError<Equipment>('Update equipment status'))
    );
  }

  deleteEquipment(id:string): Observable<Equipment> {
    const url = `${this.equipmentUrl}/${id}`;
    return this.http.delete<Equipment>(url, this.httpOptions).pipe(
      tap(() => {
        this.equipments = this.equipments?.filter(equipment => equipment._id!==id);
        alert('Deleted Equipment Successfully.');
      }),
      catchError(this.handleError<Equipment>('Delete equipment'))
    );
  }

  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.equipmentUrl)
      .pipe(
        tap((equipments: Equipment[])=> {
          console.log('fetched equipments');
          this.equipments = equipments;
        }),
        catchError(this.handleError<Equipment[]>('Get equipments', []))
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
