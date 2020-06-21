import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike, DockingStation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  url: string = 'http://localhost:8181/bike/';
  urlBd: string = 'http://localhost:8181/bikedocking/';

  constructor(private http: HttpClient) {}

  updateBikeDock(bike: Bike, dock: DockingStation): Observable<any> {
    const url =
      this.urlBd + 'addBikeToDocking/' + bike.bikeId + '/' + dock.dockingId;
    return this.http.post<any>(url, '');
  }

  getDsOnBike(bike: Bike): Observable<DockingStation> {
    const url = this.urlBd + 'getDockingId/' + bike.bikeId;
    return this.http.get<DockingStation>(url);
  }

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
    const url = this.url + 'deleteBike/' + id;
    return this.http.delete<any>(url, {
      params: {
        bikeId: id,
      },
    });
  }
}
