import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DockingStation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DockingService {
  url: string = 'http://localhost:8181/docking/';

  constructor(private http: HttpClient) {}

  getDockingStations(): Observable<DockingStation[]> {
    const url = this.url + 'getAll';
    return this.http.get<DockingStation[]>(url);
  }

  createDockingStation(ds: DockingStation): Observable<DockingStation> {
    const url = this.url + 'newDocking';
    return this.http.post<DockingStation>(url, ds);
  }

  // deleteDockingStation(ds: DockingStation): Observable<any> {
  //   const url = this.url + "deleteDocking";
  //   return this.http.delete<any>(url, {dockingId: ds.dockingId});
  // }
}
