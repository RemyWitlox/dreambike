import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DockingStation } from '../../models';

@Component({
  selector: 'app-docking-stations',
  templateUrl: './docking-stations.component.html',
  styleUrls: ['./docking-stations.component.scss'],
})
export class DockingStationsComponent {
  sortedData: DockingStation[];

  // google maps zoom level
  zoom: number = 8;

  // TODO: set initial center position for the map to city in searchbar
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  dockingStations: DockingStation[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: false,
      name: 'Kerkstraat Eindhoven',
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
      name: 'Bakkerpad Eindhoven',
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: false,
      name: 'Centrum Eindhoven',
    },
  ];

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
        case 'label':
          return compare(a.label.toString(), b.label.toString(), isAsc);
        default:
          return compare(a.name.toString(), b.name.toString(), isAsc);
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
