import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ApiKeysInterceptor implements HttpInterceptor {
  
  private readonly ACCESS_TOKEN = 'token';

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(this.ACCESS_TOKEN)
    const hasToken = !!token;

    const reqClone = request.clone({
      headers: request.headers
      .set('Authorization', hasToken ? `Bearer ${token || ''}` : `Bearer ${environment.apiKey || ''}`)
      .set('Accept', 'application/json'),
      url: `${environment.baseHost}/${request.url}`,
    })
    
    return next.handle(reqClone).pipe(catchError((error) => this.handleAuthError(error)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any>{
    if(error.status === 401){
      this.router.navigateByUrl('/authenticate')
    }

    return of(error.message)
  }
}
