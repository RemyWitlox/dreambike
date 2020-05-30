import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Bike } from 'src/app/models/bike';
import { BikeType } from 'src/app/models/bikeType';
import { BikeDriver } from 'src/app/models/bikeDriver';
import { BikeDialog, DeleteDialog } from 'src/app/dialogs';
import { MatDialog } from '@angular/material/dialog';
import { BikeDockDialog } from 'src/app/dialogs/bikeDock-dialog';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  bikes: Bike[];
  sortedData: Bike[];
  selectedBike: Bike;

  constructor(public dialog: MatDialog) {
    this.bikes = [
      {
        bikeId: 1,
        name: 'Polygon Heist 2.0',
        type: BikeType.ELECTRIC,
        driver: BikeDriver.FEMALE,
        size: 24,
        created: new Date('2019-05-17'),
      },
      {
        bikeId: 2,
        name: '2020 Path E5 Shimano E5000',
        type: BikeType.ELECTRIC,
        driver: BikeDriver.FEMALE,
        size: 22,
        created: new Date('2019-09-17'),
      },
      {
        bikeId: 3,
        name: 'Polygon Sierra AX',
        type: BikeType.ROAD,
        driver: BikeDriver.MALE,
        size: 26,
        created: new Date('2018-07-14'),
      },
      {
        bikeId: 4,
        name: '2020 Path E5 Shimano E5000',
        type: BikeType.ELECTRIC,
        driver: BikeDriver.MALE,
        size: 24,
        created: new Date('2018-03-02'),
      },
      {
        bikeId: 5,
        name: 'Trek Mountain Train',
        type: BikeType.MOUNTAIN,
        driver: BikeDriver.CHILD,
        size: 14,
        created: new Date('2018-11-21'),
      },
      {
        bikeId: 6,
        name: 'Trek Mountain Train',
        type: BikeType.MOUNTAIN,
        driver: BikeDriver.CHILD,
        size: 12,
        created: new Date('2017-01-06'),
      },
    ];
  }

  onSelect(bike) {
    if (this.selectedBike === bike) {
      this.selectedBike = new Bike();
      return;
    } else {
      this.selectedBike = bike;
    }
  }

  onEdit(bike) {
    const dialogRef = this.dialog.open(BikeDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
      data: bike,
    });
    dialogRef.afterClosed().subscribe(() => {
      // navigate back to bike
      // get bikes again form backend.
    });
  }

  onDelete(bike) {
    const deleteRef = this.dialog.open(DeleteDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '200px',
      data: bike,
    });
    deleteRef.afterClosed().subscribe(() => {
      this.selectedBike = new Bike();
      // get bikes again from backend.
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(BikeDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // route back to bikes
      // get bikes again from backend.
    });
  }

  onDocking(bike): void {
    const dialogRef = this.dialog.open(BikeDockDialog, {
      panelClass: 'dialog',
      width: '400px',
      height: '450px',
      data: bike,
    });

    dialogRef.afterClosed().subscribe(() => {
      // route back to bikes
      // get bikes again from backend.
    });
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
        case 'bikeId':
          return compare(a.bikeId, b.bikeId, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'driver':
          return compare(a.driver, b.driver, isAsc);
        case 'created':
          return compare(a.created.toString(), b.created.toString(), isAsc);
        default:
          return compare(a.name.toString(), b.name.toString(), isAsc);
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
