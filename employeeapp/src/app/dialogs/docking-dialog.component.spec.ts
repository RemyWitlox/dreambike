import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DockingDialog } from './';
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

const TEST_DIRECTIVES = [DockingDialog, NoopComponent];
@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [DockingDialog],
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

  it('should show titel and buttons', () => {
    const config = {
      data: {
        title: '',
        details: [],
      },
    };
    dialog.open(DockingDialog, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#titelDock');
    const button = overlayContainerElement.querySelector('#cancelDock');
    const btnConfirm = overlayContainerElement.querySelector('#confirmDock');

    expect(h2.textContent).toContain('a Docking station.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
  });
});
