import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { By } from '@angular/platform-browser';
import { ReceiveUser, Role } from 'src/app/models';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUser: ReceiveUser = {
    name: 'User',
    username: 'Username',
    role: Role.Admin,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, AppRoutingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference

    component.currentBackendUser = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say Welcome', () => {
    const title = 'Welcome';
    const titleElement = element.querySelector('#welcome');
    expect(titleElement.textContent).toContain(title);
  });

  it('should go to Docking Stations on clicking the button', () => {
    fixture.detectChanges();
    spyOn(component, 'goDocking');
    element = fixture.debugElement.query(By.css('#goDocking')).nativeElement;
    element.click();
    expect(component.goDocking).toHaveBeenCalled();
  });

  it('should go to Bikes on clicking the button', () => {
    fixture.detectChanges();
    spyOn(component, 'goBikes');
    element = fixture.debugElement.query(By.css('#goBikes')).nativeElement;
    element.click();
    expect(component.goBikes).toHaveBeenCalled();
  });

  it('should go to Repairs on clicking the button', () => {
    fixture.detectChanges();
    spyOn(component, 'goRepairs');
    element = fixture.debugElement.query(By.css('#goRepairs')).nativeElement;
    element.click();
    expect(component.goRepairs).toHaveBeenCalled();
  });
});
