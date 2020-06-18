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
  inject,
  fakeAsync,
  tick,
  async,
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
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
  }));

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

  it('should show titel and buttons', (done) => {
    const h2 = element.querySelector('#titelLogin');
    const button = element.querySelector('#onCancelLoginD');
    const btnConfirm = element.querySelector('#onConfirmLoginD');

    expect(h2.textContent).toContain('Login');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Login');
    done();
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

  it('should show disabled login-button if there is no password entry', (done) => {
    viewContainerFixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formcontrolname="username"]')
      .parentElement as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formcontrolname="password"]'
    ).parentElement as HTMLInputElement;
    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      viewContainerFixture.detectChanges();

      expect(nameInput.value).toEqual('ABC');
      expect(passwordInput.value).toBe(undefined);

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show disabled login-button if there is no login entry', (done) => {
    viewContainerFixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formcontrolname="username"]')
      .parentElement as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formcontrolname="password"]'
    ).parentElement as HTMLInputElement;
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      viewContainerFixture.detectChanges();

      expect(nameInput.value).toEqual(undefined);
      expect(passwordInput.value).toBe('123');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show login-button if the entries are valid', (done) => {
    viewContainerFixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector(
      'input[formControlName="username"]'
    ) as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formControlName="password"]'
    ) as HTMLInputElement;

    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('ABC');
      expect(passwordInput.value).toEqual('123');
      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('false');
    });
    done();
  });
});
