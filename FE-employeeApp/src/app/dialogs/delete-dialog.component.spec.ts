import { DeleteDialog } from '.';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

// Noop component is only a workaround to trigger change detection
@Component({
  template: '',
})
class NoopComponent {}

const TEST_DIRECTIVES = [DeleteDialog, NoopComponent];

describe('InformationDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
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
});

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [DeleteDialog],
})
class DialogTestModule {}
