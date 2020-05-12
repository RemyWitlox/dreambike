import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-docking-stations',
  templateUrl: './docking-stations.component.html',
  styleUrls: ['./docking-stations.component.scss'],
  providers: [NgbTypeaheadConfig],
})
export class DockingStationsComponent implements OnInit {
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
  public model: DockingStation;

  constructor() {
    this.sortedData = this.dockingStations.slice();
  }

  formatter = (ds: DockingStation) => ds.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.dockingStations
          .filter((state) => new RegExp(term, 'mi').test(state.name))
          .slice(0, 10)
      )
    );

  clear() {
    this.model = new DockingStation();
    console.log('bla');
  }

  selectedItem(location) {
    this.setLocation(location.item.lat, location.item.lng);
  }

  ngOnInit() {
    this.setLocation(51.44083, 5.47778);
    this.zoom = 12;
  }

  // Get Current Location Coordinates
  setLocation(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  clickedMarker(name: string, id: number) {
    console.log(`clicked the marker: ${name || id}`);
  }

  getLabel(available: number) {
    let result = available.toString();
    return result;
  }

  setActive(ds) {
    // TODO : set change to backend
    // TODO : subscribe new dockingStations.
    if ((ds.active = false)) {
      let index = this.dockingStations.indexOf(
        this.dockingStations.find((x) => x.dockingId == ds.dockingId)
      );
      this.dockingStations[index].active = true;
    } else {
      let index = this.dockingStations.indexOf(
        this.dockingStations.find((x) => x.dockingId == ds.dockingId)
      );
      this.dockingStations[index].active = false;
    }
  }

  onDelete(ds) {
    console.log('delete: ' + ds.name);
  }

  onEdit(ds) {
    console.log('edit: ' + ds.name);
  }

  newDs() {
    console.log('new ds');
  }

  onSelect(ds) {
    if (this.selectedDs === ds) {
      this.selectedDs = new DockingStation();
      return;
    }
    this.selectedDs = ds;
    console.log('selected: ' + ds.name);
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
        case 'capacity':
          return compare(a.capacity, b.capacity, isAsc);
        case 'bikes':
          return compare(a.bikes, b.bikes, isAsc);
        default:
          return compare(a.name.toString(), b.name.toString(), isAsc);
      }
    });
  }

  dockingStations: DockingStation[] = [
    {
      dockingId: 1,
      lat: 51.441262,
      lng: 5.477672,
      name: 'Centrum Eindhoven',
      bikes: 124,
      capacity: 260,
      active: true,
    },
    {
      dockingId: 2,
      lat: 51.441851,
      lng: 5.468059,
      name: 'Stadion Eindhoven',
      bikes: 86,
      capacity: 215,
      active: true,
    },
    {
      dockingId: 3,
      lat: 51.448966,
      lng: 5.45733,
      name: 'Strijp-S Eindhoven',
      bikes: 37,
      capacity: 297,
      active: true,
    },
    {
      dockingId: 4,
      lat: 51.440791,
      lng: 5.500513,
      name: 'Tongelre Eindhoven',
      bikes: 87,
      capacity: 105,
      active: true,
    },
    {
      dockingId: 5,
      lat: 51.417809,
      lng: 5.450364,
      name: 'Gestel  Eindhoven',
      bikes: 137,
      capacity: 184,
      active: true,
    },
    {
      dockingId: 6,
      lat: 51.420344,
      lng: 5.496238,
      name: 'Stratum  Eindhoven',
      bikes: 18,
      capacity: 394,
      active: true,
    },
    {
      dockingId: 7,
      lat: 51.461553,
      lng: 5.472903,
      name: 'Woensel Zuid Eindhoven',
      bikes: 72,
      capacity: 143,
      active: true,
    },
    {
      dockingId: 8,
      lat: 51.482542,
      lng: 5.481652,
      name: 'Woensel Noord Eindhoven',
      bikes: 37,
      capacity: 104,
      active: true,
    },
  ];
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
