import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';

// used to create fake backend
import { fakeBackendProvider } from '../app/_helpers';

// Services;
import { CustomHttpInterceptorService } from './services';

// Components:
import { AppComponent } from './components/app';
import { AppRoutingModule } from './router/app-routing.module';
import { HomeComponent } from './components/home';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { SettingsComponent } from './components/settings';
import { AnalyticsComponent } from './components/analytics';
import { RepairsComponent } from './components/repairs';
import { BikesComponent } from './components/bikes';
import { DockingStationsComponent } from './components/docking-stations';

// Dialogs:
import { LoginDialog } from './dialogs/login-dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialog,
    SettingsComponent,
    AnalyticsComponent,
    RepairsComponent,
    BikesComponent,
    DockingStationsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
  ],
  exports: [FormsModule, ReactiveFormsModule],
  entryComponents: [LoginDialog],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
