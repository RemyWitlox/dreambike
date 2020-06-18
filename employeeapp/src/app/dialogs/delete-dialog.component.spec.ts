import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DeleteDialog } from './';
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

const TEST_DIRECTIVES = [DeleteDialog, NoopComponent];
@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [DeleteDialog],
})
class DialogTestModule {}
describe('Delete Dialog', () => {
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
    dialog.open(DeleteDialog, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h1 = overlayContainerElement.querySelector('#titelDel');
    const button = overlayContainerElement.querySelector('#cancelDel');
    const btnConfirm = overlayContainerElement.querySelector('#confirmDel');

    expect(h1.textContent).toContain('Delete ');
    expect(button.textContent).toContain('No');
    expect(btnConfirm.textContent).toContain('Yes');
  });
});
