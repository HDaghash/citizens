import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(errorReponse => {
        let throwErrorMessage = null;
        if (errorReponse instanceof HttpErrorResponse) {
          const { status, statusText, message, error } = errorReponse;
          throwErrorMessage = error;
          const displayErrorMessage = `HTTP ERROR: ${status} - ${statusText}\n${message}\n\nBACKEND RESPONSE: `;
          const errorMessage = error ? error.message : 'Somthing went wrong!';
          this.message.create('error', errorMessage);
          console.error(displayErrorMessage);
        }
        return throwError(throwErrorMessage);
      })
    );
  }
}

export const ErrorHttpInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
