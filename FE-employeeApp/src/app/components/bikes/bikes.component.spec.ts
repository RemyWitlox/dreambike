import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BikesComponent } from './bikes.component';
import { Bike } from 'src/app/models';

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
  let fixture: ComponentFixture<BikesComponent>;

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
      declarations: [BikesComponent],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(BikesComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog on edit', () => {
    const ds = new Bike();
    component.onEdit(ds);
  });

  it('should open the dialog on delete', () => {
    const ds = new Bike();
    component.onDelete(ds);
  });

  it('should open the dialog on add', () => {
    component.onAdd();
  });
});
