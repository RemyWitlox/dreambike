import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DockingStation } from '../../models';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
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
  public dockingStations: DockingStation[];
  public sortedData: DockingStation[];
  public loading: boolean = false;

  public address: string;
  public lat: number = 51.441262;
  public lng: number = 5.477672;
  // google maps zoom level
  public zoom: number;
  public selectedDs: DockingStation;
  public newDocking: DockingStation = {
    dockingId: 0,
    name: '',
    bikes: 0,
    capacity: 0,
    lat: 0,
    lng: 0,
    active: true,
  };

  constructor(
    private dialog: MatDialog,
    private dockingService: DockingService
  ) {}

  public ngOnInit() {
    this.getDockingStations();
    this.setLocation(51.44083, 5.47778);
    this.zoom = 12;
  }

  public getDockingStations(): void {
    this.loading = true;
    this.dockingStations = [];
    this.dockingService.getDockingStations().subscribe(
      (ds) => {
        this.dockingStations = ds;
        this.sortedData = this.dockingStations.sort((a, b) => {
          return compare(a.dockingId, b.dockingId, true);
        });
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loading = false;
      }
    );
    this.selectedDs = new DockingStation();
  }

  public search = (text$: Observable<string>) =>
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

  public formatter = (ds: DockingStation) => ds.name;

  public selectedItem(location) {
    this.setLocation(location.item.lat, location.item.lng);
  }

  // Get Current Location Coordinates
  public setLocation(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.zoom = 12;
  }

  public clickedMarker(name: string, id: number) {
    console.log(`clicked the marker: ${name || id}`);
  }

  public async setActive(ds: DockingStation) {
    this.newDocking.dockingId = ds.dockingId;
    this.newDocking.name = ds.name;
    this.newDocking.bikes = ds.bikes;
    this.newDocking.capacity = ds.capacity;
    this.newDocking.lat = ds.lat;
    this.newDocking.lng = ds.lng;
    if (ds.active) {
      this.newDocking.active = true;
    } else {
      this.newDocking.active = false;
    }
    this.dockingService.updateDockingStation(this.newDocking).subscribe(
      () => {
        this.getDockingStations();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public onDelete(ds): void {
    const deleteRef = this.dialog.open(DeleteDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '200px',
      data: ds,
    });
    deleteRef.afterClosed().subscribe(() => {
      this.getDockingStations();
    });
  }

  public onEdit(ds) {
    const dialogRef = this.dialog.open(DockingDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
      data: ds,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getDockingStations();
    });
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(DockingDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getDockingStations();
    });
  }

  public onSelect(ds) {
    if (this.selectedDs === ds) {
      this.selectedDs = new DockingStation();
      return;
    } else {
      this.selectedDs = ds;
      this.setLocation(ds.lat, ds.lng);
    }
  }

  public sortData(sort: Sort) {
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
