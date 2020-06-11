import {
  inject,
  async,
  fakeAsync,
  ComponentFixture,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  NgModule,
  Component,
  Directive,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginDialog } from '../dialogs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';

// helper classes
// tslint:disable-next-line:directive-selector
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

// Create a real (non-test) NgModule as a workaround for
const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  LoginDialog,
];

@NgModule({
  imports: [ReactiveFormsModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [LoginDialog],
})
class DialogTestModule {}

describe('Login Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<LoginDialog>;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<DlgTestChildViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      declarations: [],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
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

  // it('should be created', fakeAsync(() => {
  //   expect(overlayContainerElement.querySelector('h1').innerText).toEqual(
  //     'Login'
  //   );
  // }));

  // it('should close and return false when cancel button pressed', async(() => {
  //   const afterCloseCallback = jasmine.createSpy('afterClose callback');

  //   dialogRef.afterClosed().subscribe(afterCloseCallback);
  //   (overlayContainerElement.querySelector(
  //     'button[mat-dialog-close="false"]'
  //   ) as HTMLElement).click();
  //   viewContainerFixture.detectChanges();

  //   viewContainerFixture.whenStable().then(() => {
  //     expect(
  //       overlayContainerElement.querySelector('mat-dialog-container')
  //     ).toBeNull('Dialog box still open');
  //     expect(afterCloseCallback).toHaveBeenCalledWith('false');
  //   });
  // }));

  // describe('should disable login button', () => {
  //   it('without a user and password entry', fakeAsync(() => {
  //     const btn = overlayContainerElement.querySelector(
  //       'button[mat-raised-button]'
  //     );
  //     expect(btn.getAttribute('ng-reflect-disabled')).toBe('true');

  //     dialogRef.close();
  //     tick(500);
  //     viewContainerFixture.detectChanges();
  //   }));

  //   it('with a user entry but without a password entry', async(() => {
  //     (overlayContainerElement.querySelector(
  //       'input[formcontrolname="username"]'
  //     ) as HTMLInputElement).value = 'DD';
  //     viewContainerFixture.detectChanges();

  //     viewContainerFixture.whenStable().then(() => {
  //       viewContainerFixture.detectChanges();
  //       const nameInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="username"]'
  //       );
  //       const passwordInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="password"]'
  //       );

  //       expect((nameInput as HTMLInputElement).value).toEqual('DD');
  //       expect((passwordInput as HTMLInputElement).value).toEqual('');
  //       expect(
  //         overlayContainerElement
  //           .querySelector('button[mat-raised-button]')
  //           .getAttribute('ng-reflect-disabled')
  //       ).toBe('true');
  //     });
  //   }));

  //   it('with a password but without a user entry', async(() => {
  //     (overlayContainerElement.querySelector(
  //       'input[formcontrolname="password"]'
  //     ) as HTMLInputElement).value = 'Password';
  //     viewContainerFixture.detectChanges();

  //     viewContainerFixture.whenStable().then(() => {
  //       viewContainerFixture.detectChanges();
  //       const nameInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="username"]'
  //       );
  //       const passwordInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="password"]'
  //       );

  //       expect((nameInput as HTMLInputElement).value).toEqual('');
  //       expect((passwordInput as HTMLInputElement).value).toEqual('Password');
  //       expect(
  //         overlayContainerElement
  //           .querySelector('button[mat-raised-button]')
  //           .getAttribute('ng-reflect-disabled')
  //       ).toBe('true');
  //     });
  //   }));

  //   it('with a valid user name but invalid password', async(() => {
  //     (overlayContainerElement.querySelector(
  //       'input[formcontrolname="username"]'
  //     ) as HTMLInputElement).value = 'ABC';
  //     (overlayContainerElement.querySelector(
  //       'input[formcontrolname="password"]'
  //     ) as HTMLInputElement).value = '1234567';
  //     viewContainerFixture.detectChanges();

  //     viewContainerFixture.whenStable().then(() => {
  //       viewContainerFixture.detectChanges();
  //       const nameInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="username"]'
  //       );
  //       const passwordInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="password"]'
  //       );

  //       expect((nameInput as HTMLInputElement).value).toEqual('ABC');
  //       expect((passwordInput as HTMLInputElement).value).toEqual('1234567');
  //       expect(
  //         overlayContainerElement
  //           .querySelector('button[mat-raised-button]')
  //           .getAttribute('ng-reflect-disabled')
  //       ).toBe('true');
  //     });
  //   }));

  //   it('with an invalid username but with a valid password', async(() => {
  //     (overlayContainerElement.querySelector(
  //       'input[formcontrolname="username"]'
  //     ) as HTMLInputElement).value = 'AB';
  //     (overlayContainerElement.querySelector(
  //       'input[formcontrolname="password"]'
  //     ) as HTMLInputElement).value = '12345678';
  //     viewContainerFixture.detectChanges();

  //     viewContainerFixture.whenStable().then(() => {
  //       viewContainerFixture.detectChanges();
  //       const nameInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="username"]'
  //       );
  //       const passwordInput = overlayContainerElement.querySelector(
  //         'input[formcontrolname="password"]'
  //       );

  //       expect((nameInput as HTMLInputElement).value).toEqual('AB');
  //       expect((passwordInput as HTMLInputElement).value).toEqual('12345678');
  //       expect(
  //         overlayContainerElement
  //           .querySelector('button[mat-raised-button]')
  //           .getAttribute('ng-reflect-disabled')
  //       ).toBe('true');
  //     });
  //   }));
  // });

  // it('should enable the login button when a valid username and password are entered', fakeAsync(() => {
  //   (overlayContainerElement.querySelector(
  //     'input[formcontrolname="username"]'
  //   ) as HTMLInputElement).value = 'ABC';
  //   (overlayContainerElement.querySelector(
  //     'input[formcontrolname="password"]'
  //   ) as HTMLInputElement).value = '12345678';
  //   viewContainerFixture.detectChanges();
  //   tick();

  //   viewContainerFixture.detectChanges();
  //   const loginBtn = overlayContainerElement.querySelector(
  //     'button[mat-raised-button]'
  //   );
  //   const nameInput = overlayContainerElement.querySelector(
  //     'input[formcontrolname="username"]'
  //   );
  //   const passwordInput = overlayContainerElement.querySelector(
  //     'input[formcontrolname="password"]'
  //   );
  //   console.log('Login Button is:', loginBtn.textContent);
  //   console.log(
  //     'Login Button is:',
  //     loginBtn.getAttribute('ng-reflect-disabled')
  //   );

  //   expect((nameInput as HTMLInputElement).value).toEqual('ABC');
  //   expect((passwordInput as HTMLInputElement).value).toEqual('12345678');
  //   expect(
  //     overlayContainerElement
  //       .querySelector('button[mat-raised-button]')
  //       .getAttribute('ng-reflect-disabled')
  //   ).toBe('false');
  // }));

  // it('should enable the login button when a valid username and password are entered', async(() => {
  //   const loginBtn = overlayContainerElement.querySelector(
  //     'button[mat-raised-button]'
  //   ) as HTMLButtonElement;
  //   const nameInput = overlayContainerElement.querySelector(
  //     'input[formcontrolname="username"]'
  //   ) as HTMLInputElement;
  //   const passwordInput = overlayContainerElement.querySelector(
  //     'input[formcontrolname="password"]'
  //   ) as HTMLInputElement;
  //   nameInput.value = 'ABC';
  //   nameInput.dispatchEvent(new Event('input'));
  //   passwordInput.value = '12345678';
  //   passwordInput.dispatchEvent(new Event('input'));
  //   viewContainerFixture.detectChanges();

  //   viewContainerFixture.whenStable().then(() => {
  //     viewContainerFixture.detectChanges();
  //     expect(nameInput.value).toEqual('ABC');
  //     expect(passwordInput.value).toEqual('12345678');
  //     expect(loginBtn.getAttribute('ng-reflect-disabled')).toBe(
  //       'false',
  //       'Login button disabled should now be false'
  //     );
  //   });
  // }));
});
