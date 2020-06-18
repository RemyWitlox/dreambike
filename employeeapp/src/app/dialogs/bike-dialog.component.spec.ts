import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BikeDialog } from './bike-dialog';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NoopComponent } from '../_helpers';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';

const TEST_DIRECTIVES = [BikeDialog, NoopComponent];
@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [BikeDialog],
})
class DialogTestModule {}
describe('Add/Edit Bike Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<BikeDialog>;
  let element: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule, ReactiveFormsModule, FormsModule],
      providers: [
        HttpClientModule,
        FormBuilder,
        DatePipe,
        HttpClient,
        HttpHandler,
        {
          provide: OverlayContainer,
          useFactory: () => {
            element = document.createElement('div');
            return { getContainerElement: () => element };
          },
        },
      ],
    });

    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(BikeDialog);
    noop.detectChanges();
  });

  it('should show titel and buttons', () => {
    const h2 = element.querySelector('#titelBike');
    const button = element.querySelector('#onCancelBikeD');
    const btnConfirm = element.querySelector('#onConfirmBikeD');

    expect(h2.textContent).toContain('a Bike.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
  });

  it('should close when cancel button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelBikeD') as HTMLElement).click();
    noop.detectChanges();

    noop.whenStable().then(() => {
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });
});
