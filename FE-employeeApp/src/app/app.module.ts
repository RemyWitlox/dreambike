import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './router/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './components/app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentComponent } from '../app/components/content/content.component';
import { LoginDialog } from './dialogs/login-dialog';
import { CustomHttpInterceptorService } from './services/custom-http-interceptor.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ContentComponent, LoginDialog],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
