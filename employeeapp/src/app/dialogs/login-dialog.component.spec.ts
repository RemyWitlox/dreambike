import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LoginDialog } from './';
import {
  ComponentFixture,
  TestBed,
  async,
  inject,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import {
  NgModule,
  Component,
  ViewChild,
  Directive,
  ViewContainerRef,
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/material-module';

@Directive({ selector: 'dir-with-view-container' })
class DlgTestViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'lpa-arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
class DlgTestChildViewContainerComponent {
  @ViewChild(DlgTestViewContainerDirective)
  childWithViewContainer: DlgTestViewContainerDirective;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  LoginDialog,
];

@NgModule({
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterTestingModule,
    RouterModule,
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [LoginDialog],
})
class DialogTestModule {}
describe('Login Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<LoginDialog>;
  let element: HTMLElement;
  let viewContainerFixture: ComponentFixture<DlgTestChildViewContainerComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        HttpClientModule,
        FormBuilder,
        DatePipe,
        HttpClient,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        HttpHandler,
        {
          provide: OverlayContainer,
          useFactory: () => {
            element = document.createElement('div');
            return { getContainerElement: () => element };
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(inject([MatDialog], (d: MatDialog) => {
    dialog = d;
  }));

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(
      DlgTestChildViewContainerComponent
    );
    viewContainerFixture.detectChanges();
    dialogRef = dialog.open(LoginDialog);
    viewContainerFixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    expect(dialogRef.componentInstance instanceof LoginDialog).toBe(
      true,
      'Failed to open'
    );
    dialogRef.close();
    tick(500);
    viewContainerFixture.detectChanges();
  }));

  it('shows titel and buttons', () => {
    const h2 = element.querySelector('#titelLogin');
    const button = element.querySelector('#onCancelLoginD');
    const btnConfirm = element.querySelector('#onConfirmLoginD');

    expect(h2.textContent).toContain('Login');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Login');
  });

  it('should close when cancel button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelLoginD') as HTMLElement).click();
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });

  it('should show disabled login-button if there is no password entry', fakeAsync(() => {
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector(
      'input[formcontrolname="username"]'
    ) as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formcontrolname="password"]'
    ) as HTMLInputElement;
    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      viewContainerFixture.detectChanges();

      expect(nameInput.value).toEqual('ABC');
      expect(passwordInput.value).toEqual('');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
  }));

  it('should show disabled login-button if there is no password entry', async(() => {
    (element.querySelector(
      'input[formcontrolname="password"]'
    ) as HTMLInputElement).value = 'Password';
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      viewContainerFixture.detectChanges();
      const nameInput = element.querySelector(
        'input[formcontrolname="username"]'
      );
      const passwordInput = element.querySelector(
        'input[formcontrolname="password"]'
      );

      expect((nameInput as HTMLInputElement).value).toEqual('');
      expect((passwordInput as HTMLInputElement).value).toEqual('Password');
      expect(
        element
          .querySelector('button[md-raised-button]')
          .getAttribute('ng-reflect-disabled')
      ).toBe('true');
    });
  }));
});
