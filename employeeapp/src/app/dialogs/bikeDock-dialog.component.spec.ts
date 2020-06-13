import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BikeDockDialog } from './';
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

const TEST_DIRECTIVES = [BikeDockDialog, NoopComponent];
@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [BikeDockDialog],
})
class DialogTestModule {}
describe('Add/Edit Docking Station on Bike Dialog', () => {
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
    dialog.open(BikeDockDialog, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h1 = overlayContainerElement.querySelector('#titelBikeDock');
    const button = overlayContainerElement.querySelector('#onCancel');
    const btnConfirm = overlayContainerElement.querySelector('#onConfirm');

    expect(h1.textContent).toContain('the Docking Station.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
  });
});
