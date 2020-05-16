import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('accestoken')) {
      console.log('if werkt');

      let myheaders = new HttpHeaders();
      myheaders = myheaders.append('Content-Type', 'application/json');
      myheaders = myheaders.append(
        'Authorization',
        'Bearer ' + localStorage.getItem('accesstoken')
      );
      for (const key of req.headers.keys()) {
        myheaders[key] = req.headers.getAll[key];
      }

      return next.handle(req.clone({ headers: myheaders }));
    } else {
      console.log('if werkt niet. ');
      return next.handle(req.clone());
    }
  }

  constructor() {}
}
