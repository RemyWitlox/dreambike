import { AppComponent } from './app.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { Role } from 'src/app/models';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true }),
    };
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<AppComponent>;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
  });

  beforeEach(async () => {
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a titel and subtitle', () => {
    // * arrange
    const title = 'Dreambike';
    const subtitle = 'DreamBike Employee Application';
    const titleElement = element.querySelector('h1');
    const subtitleElement = element.querySelector('span');
    // * act
    component.title = title;
    component.subtitle = subtitle;
    fixture.detectChanges();
    // * assert
    expect(titleElement.textContent).toContain(title);
    expect(subtitleElement.textContent).toContain(subtitle);
  });

  it('should open the Login dialog', () => {
    component.currentBackendUser = null;
    fixture.detectChanges();
    spyOn(component, 'onLogin');
    element = fixture.debugElement.query(By.css('#onLoginApp')).nativeElement;
    element.click();
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should logout a user', () => {
    const user = {
      name: 'Test',
      username: 'Testuser',
      role: Role.Admin,
    };
    component.currentBackendUser = user;

    fixture.detectChanges();
    spyOn(component, 'onLogout');
    element = fixture.debugElement.query(By.css('#onLogoutApp')).nativeElement;
    element.click();
    expect(component.onLogout).toHaveBeenCalled();
  });
});
