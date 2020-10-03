import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private Auth:SocialAuthService,private AuthenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer '+this.AuthenticationService.getToken())
    });
      return next.handle(authReq);  
  }
}
