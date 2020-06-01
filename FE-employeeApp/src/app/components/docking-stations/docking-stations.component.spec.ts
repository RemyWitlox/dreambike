import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DockingStationsComponent } from './docking-stations.component';
import { DockingStation } from 'src/app/models';
import { By } from '@angular/platform-browser';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true }),
    };
  }
}

describe('DockingStationsComponent', () => {
  let component: DockingStationsComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<DockingStationsComponent>;
  let testData: DockingStation[] = [
    {
      dockingId: 1,
      name: 'Docking1',
      bikes: 1,
      capacity: 2,
      active: true,
      lat: 51.6456,
      lng: 61.55492,
    },
    {
      dockingId: 2,
      name: 'Docking2',
      bikes: 3,
      capacity: 4,
      active: true,
      lat: 51.6456,
      lng: 61.55492,
    },
    {
      dockingId: 3,
      name: 'Docking3',
      bikes: 5,
      capacity: 6,
      active: false,
      lat: 51.6456,
      lng: 61.55492,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
      ],
      declarations: [DockingStationsComponent],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DockingStationsComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    component.sortedData = testData;
  });

  beforeEach(async () => {
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();

    component.getDockingStations();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show a table of docking stations', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(5);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('');
      expect(headerRow.cells[1].innerHTML).toContain('Name');
      expect(headerRow.cells[2].innerHTML).toContain('Active');
      expect(headerRow.cells[3].innerHTML).toContain('Bikes');
      expect(headerRow.cells[4].innerHTML).toContain('Space');
      expect(headerRow.cells[5].innerHTML).toContain('Capacity');
      expect(headerRow.cells[6].innerHTML).toContain('Latitude');
      expect(headerRow.cells[7].innerHTML).toContain('Longitude');
      // Data rows
      //{ dockingId: 1, name: "Docking1", bikes: 1, capacity: 2, active: true, lat: 51.6456, lng: 61.55492 },
      let row1 = tableRows[1];
      expect(row1.cells[1].innerHTML).toContain('Docking1');
      expect(row1.cells[2].innerHTML).toContain('true');
      expect(row1.cells[3].innerHTML).toContain('1');
      expect(row1.cells[4].innerHTML).toContain('1');
      expect(row1.cells[5].innerHTML).toContain('2');
      expect(row1.cells[6].innerHTML).toContain('51.6456');
      expect(row1.cells[7].innerHTML).toContain('61.55492');

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
});
