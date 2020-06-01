import {
  TestBed,
  async,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BikesComponent } from './bikes.component';
import { BikeDialog } from 'src/app/dialogs';
import { By } from '@angular/platform-browser';
import { Bike, BikeType, BikeDriver } from 'src/app/models';
import { formatDate } from '@angular/common';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true }),
    };
  }
}

describe('BikesComponent', () => {
  let component: BikesComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<BikesComponent>;
  let testData: Bike[] = [
    {
      bikeId: 1,
      name: 'Bike1',
      type: BikeType.ELECTRIC,
      driver: BikeDriver.FEMALE,
      size: 24,
      created: new Date(),
    },
    {
      bikeId: 2,
      name: 'Bike2',
      type: BikeType.HYBRID,
      driver: BikeDriver.MALE,
      size: 28,
      created: new Date(),
    },
    {
      bikeId: 3,
      name: 'Bike3',
      type: BikeType.MOUNTAIN,
      driver: BikeDriver.CHILD,
      size: 14,
      created: new Date(),
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
      ],
      declarations: [BikesComponent, BikeDialog],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(BikesComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    component.sortedData = testData;
  }));

  beforeEach(async () => {
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show a table of bikes', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(5);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('');
      expect(headerRow.cells[1].innerHTML).toContain('Id');
      expect(headerRow.cells[2].innerHTML).toContain('Name');
      expect(headerRow.cells[3].innerHTML).toContain('Type');
      expect(headerRow.cells[4].innerHTML).toContain('Driver');
      expect(headerRow.cells[5].innerHTML).toContain('Size');
      expect(headerRow.cells[6].innerHTML).toContain('Created');
      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[1].innerHTML).toContain('1');
      expect(row1.cells[2].innerHTML).toContain('Bike1');
      expect(row1.cells[3].innerHTML).toContain('Electric');
      expect(row1.cells[4].innerHTML).toContain('Female');
      expect(row1.cells[5].innerHTML).toContain('24');
      expect(row1.cells[6].innerHTML).toContain(
        formatDate(new Date(), 'dd-MM-yyyy', 'en-US')
      );
      done();
    });
  });

  it('should open the dialog on add', () => {
    fixture.detectChanges();
    spyOn(component, 'onAdd');
    element = fixture.debugElement.query(By.css('#onAdd')).nativeElement;
    element.click();
    expect(component.onAdd).toHaveBeenCalled();
  });

  it('should open the dialog on edit', () => {
    fixture.detectChanges();
    spyOn(component, 'onEdit');
    element = fixture.debugElement.query(By.css('#onEdit')).nativeElement;
    element.click();
    expect(component.onEdit).toHaveBeenCalled();
  });

  it('should open the dialog on delete', () => {
    fixture.detectChanges();
    spyOn(component, 'onDelete');
    element = fixture.debugElement.query(By.css('#onDelete')).nativeElement;
    element.click();
    expect(component.onDelete).toHaveBeenCalled();
  });

  it('should open the dialog on adding a docking station to the bike', () => {
    fixture.detectChanges();
    spyOn(component, 'onDocking');
    element = fixture.debugElement.query(By.css('#onDocking')).nativeElement;
    element.click();
    expect(component.onDocking).toHaveBeenCalled();
  });
});
