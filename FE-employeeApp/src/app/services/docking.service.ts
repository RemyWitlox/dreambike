import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DockingStation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DockingService {
  url: string = 'http://localhost:2020/api/getAllDocking';

  constructor(private http: HttpClient) {}

  getDockingStations(): Observable<DockingStation[]> {
    return this.http.get<DockingStation[]>(this.url);
  }
}
