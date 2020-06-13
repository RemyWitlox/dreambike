import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BikeDialog } from './bike-dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NoopComponent } from '../_helpers';
import { FormBuilder } from '@angular/forms';
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
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        HttpClientModule,
        FormBuilder,
        DatePipe,
        HttpClient,
        HttpHandler,
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          },
        },
      ],
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);
  });

  it('shows titel and buttons', () => {
    const config = {
      data: {
        title: '',
        details: [],
      },
    };
    dialog.open(BikeDialog, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#titelBike');
    const button = overlayContainerElement.querySelector('#onCancel');
    const btnConfirm = overlayContainerElement.querySelector('#onConfirm');

    expect(h2.textContent).toContain('a Bike.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
  });
});
