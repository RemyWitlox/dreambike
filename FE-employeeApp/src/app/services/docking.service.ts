import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceiveUser, DockingStation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DockingService {
  url: string = 'http://Localhost:2020/api/docking';

  constructor(private http: HttpClient) {}

  getDockingStations(): Observable<DockingStation[]> {
    return this.http.get<DockingStation[]>(this.url);
  }

  getUserById(id: number) {}
}
