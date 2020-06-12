import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BikeDialog } from './bike-dialog';
import {
  ComponentFixture,
  async,
  TestBed,
  inject,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MaterialModule } from 'src/material-module';
import { DatePipe } from '@angular/common';

describe('Add/Edit Bike Dialog', () => {
  let dialog: MatDialog;
  let overlayContainer: OverlayContainer;
  let component: BikeDialog;
  let fixture: ComponentFixture<BikeDialog>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        DatePipe,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Add a Bike.',
          },
        },
      ],
      declarations: [BikeDialog],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [BikeDialog],
      },
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(BikeDialog);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  beforeEach(inject(
    [MatDialog, OverlayContainer],
    (d: MatDialog, oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('form invalid when empty', () => {
    expect(component.bikeForm.valid).toBeFalsy();
  });
});
