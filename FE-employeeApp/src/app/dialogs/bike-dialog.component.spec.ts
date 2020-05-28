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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MaterialModule } from 'src/material-module';

describe('BikeDialog', () => {
  let dialog: MatDialog;
  let overlayContainer: OverlayContainer;
  let component: BikeDialog;
  let fixture: ComponentFixture<BikeDialog>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ReactiveFormsModule, MaterialModule],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('onCancel should close the dialog', () => {
  //   component.onCancel();
  //   expect(mockDialogRef.close).toHaveBeenCalled();
  // });
});
