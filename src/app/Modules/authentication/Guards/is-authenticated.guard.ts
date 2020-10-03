import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private Auth:AuthenticationService,private route:Router,private SocialService:SocialAuthService)
  {
  
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     console.log("AuthState",this.Auth.CheckAuthState())
      if(this.Auth.CheckAuthState())
     {
       return true;
     }
     else{
       this.route.navigate(["/Login"])
       return false;
     }
  }
  
}
