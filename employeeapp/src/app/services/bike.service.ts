import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  url: string = 'http://localhost:8181/bike/';

  constructor(private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    const url = this.url + 'getAll';
    return this.http.get<Bike[]>(url);
  }

  createBike(bike: Bike): Observable<Bike> {
    const url = this.url + 'newBike';
    return this.http.post<Bike>(url, bike);
  }

  updateBike(bike: Bike): Observable<Bike> {
    const url = this.url + 'updateBike';
    return this.http.put<Bike>(url, bike);
  }

  deleteBike(id): Observable<any> {
    const url = this.url + 'deleteBike/' + id.toString();
    return this.http.delete<any>(url);
  }
}
