import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DockingStation } from '../../models';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { DockingDialog } from 'src/app/dialogs/docking-dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../dialogs';
import { Router } from '@angular/router';
import { DockingService } from 'src/app/services/docking.service';

@Component({
  selector: 'app-docking-stations',
  templateUrl: './docking-stations.component.html',
  styleUrls: ['./docking-stations.component.scss'],
  providers: [NgbTypeaheadConfig],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockingStationsComponent implements OnInit {
  public model: DockingStation;
  dockingStations: DockingStation[];
  searchForm = new FormGroup({
    city: new FormControl(''),
  });
  sortedData: DockingStation[];

  // TODO: set initial center position for the map to city in searchbar
  address: string;
  lat: number = 51.441262;
  lng: number = 5.477672;
  // google maps zoom level
  zoom: number;
  selectedDs: DockingStation;

  constructor(
    private dialog: MatDialog,
    private dockingService: DockingService,
    private router: Router
  ) {
    this.getDockingStations();
  }

  ngOnInit() {
    this.setLocation(51.44083, 5.47778);
    this.zoom = 12;
  }

  getDockingStations(): void {
    this.dockingService.getDockingStations().subscribe(
      (ds) => {
        this.dockingStations = ds;
        this.sortedData = this.dockingStations.sort((a, b) => {
          return compare(a.dockingId, b.dockingId, true);
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.selectedDs = new DockingStation();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.dockingStations
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (ds: DockingStation) => ds.name;

  selectedItem(location) {
    this.setLocation(location.item.lat, location.item.lng);
  }

  // Get Current Location Coordinates
  setLocation(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.zoom = 12;
  }

  clickedMarker(name: string, id: number) {
    console.log(`clicked the marker: ${name || id}`);
  }

  setActive(i) {
    // TODO : set change to backend
    // TODO : subscribe new dockingStations.
  }

  onDelete(ds): void {
    const deleteRef = this.dialog.open(DeleteDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '200px',
      data: ds,
    });
    deleteRef.afterClosed().subscribe(() => {
      this.selectedDs = new DockingStation();
      this.dockingService.getDockingStations().subscribe((ds) => {
        this.dockingStations = ds;
        this.sortedData = this.dockingStations.sort((a, b) => {
          return compare(a.name, b.name, true);
        });
      });
    });

    console.log('delete: ' + ds.name);
  }

  onEdit(ds) {
    const dialogRef = this.dialog.open(DockingDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
      data: ds,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['dockingStations']);
      this.getDockingStations();
    });
  }

  newDs(): void {
    const dialogRef = this.dialog.open(DockingDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['dockingStations']);
      this.getDockingStations();
    });
  }

  onSelect(ds) {
    if (this.selectedDs === ds) {
      this.selectedDs = new DockingStation();
      return;
    }
    this.selectedDs = ds;
    this.setLocation(ds.lat, ds.lng);
  }

  sortData(sort: Sort) {
    const data = this.sortedData;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'dockingId':
          return compare(a.dockingId, b.dockingId, isAsc);
        case 'active':
          return compare(a.active.toString(), b.active.toString(), isAsc);
        case 'capacity':
          return compare(a.capacity, b.capacity, isAsc);
        case 'bikes':
          return compare(a.bikes, b.bikes, isAsc);
        default:
          return compare(a.name.toString(), b.name.toString(), isAsc);
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
