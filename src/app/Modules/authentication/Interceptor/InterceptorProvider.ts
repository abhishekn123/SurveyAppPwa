import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true },
];