import { TestBed, async, ComponentFixture } from '@angular/core/testing';
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
import { APP_BASE_HREF } from '@angular/common';
import { Bike, BikeType, BikeDriver } from 'src/app/models';

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
  const testData: Bike[] = [
    {
      bikeId: 1,
      name: 'Bike1',
      type: BikeType.ELECTRIC,
      driver: BikeDriver.CHILD,
      size: 24,
      broken: true,
      created: new Date('2019-07-14'),
    },
    {
      bikeId: 2,
      name: 'Bike2',
      type: BikeType.HYBRID,
      driver: BikeDriver.FEMALE,
      size: 26,
      broken: false,
      created: new Date('2018-03-01'),
    },
    {
      bikeId: 3,
      name: 'Bike3',
      type: BikeType.MOUNTAIN,
      driver: BikeDriver.MALE,
      size: 28,
      broken: false,
      created: new Date('2008-11-20'),
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
      ],
      declarations: [BikesComponent, BikeDialog],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BikesComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference

    component.sortedData = testData;
    component.bikes = testData;
    component.error = false;
    component.loading = false;
  }));

  beforeEach(async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    component.sortedData = testData;
    component.bikes = testData;
    component.error = false;
    component.loading = false;
  });

  it('should create the app', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should show a table of bikes', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.sortedData = testData;
      component.bikes = testData;

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
      expect(headerRow.cells[6].innerHTML).toContain('Broken');
      expect(headerRow.cells[7].innerHTML).toContain('Created');
      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[1].innerHTML).toContain('1');
      expect(row1.cells[2].innerHTML).toContain('Bike1');
      expect(row1.cells[3].innerHTML).toContain(' ');
      expect(row1.cells[4].innerHTML).toContain(' ');
      expect(row1.cells[5].innerHTML).toContain('24');
      expect(row1.cells[6].innerHTML).toContain('true');
      expect(row1.cells[7].innerHTML).toContain('14-07-2019');
      done();
    });
  });

  it('should open the dialog on add', (done) => {
    fixture.detectChanges();
    spyOn(component, 'onAdd');
    element = fixture.debugElement.query(By.css('#onAdd')).nativeElement;
    element.click();
    expect(component.onAdd).toHaveBeenCalled();
    done();
  });

  it('should open the dialog on edit', (done) => {
    fixture.detectChanges();
    spyOn(component, 'onEdit');
    element = fixture.debugElement.query(By.css('#onEdit')).nativeElement;
    element.click();
    expect(component.onEdit).toHaveBeenCalled();
    done();
  });

  it('should open the dialog on delete', (done) => {
    fixture.detectChanges();
    spyOn(component, 'onDelete');
    element = fixture.debugElement.query(By.css('#onDelete')).nativeElement;
    element.click();
    expect(component.onDelete).toHaveBeenCalled();
    done();
  });

  it('should open the dialog on changing the docking station of the bike', (done) => {
    fixture.detectChanges();
    spyOn(component, 'onDocking');
    element = fixture.debugElement.query(By.css('#onDocking')).nativeElement;
    element.click();
    expect(component.onDocking).toHaveBeenCalled();
    done();
  });
});
