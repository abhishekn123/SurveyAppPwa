import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{

  constructor(private http:HttpClient,private SocialService:SocialAuthService) { }
  BaseUrl="https://localhost:5001"
  // BaseUrl="https://113ddd882f5c.ngrok.io"
  ngOnInit(): void {
    this.SocialService.authState.subscribe((user:SocialUser)=>
      {
         this.user$.next(user);
      })
  }
  getToken():string{
    return localStorage.getItem('Token');
  }
  user$=new Subject<SocialUser>();
  CheckAuthState():Boolean
  {
    let Token=this.getToken()
    const helper = new JwtHelperService();
     if(Token)
     {
       try{
        if(helper.isTokenExpired(Token))
        {
          this.user$.next(null);
          this.SocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:SocialUser)=>
            {
               localStorage.setItem("Token",data.idToken);
               console.log("loginSucessfull After Token Expiration")
            })
          return false;          
        }
       }
       catch{
        this.user$.next(null);
         return false;
       }     
        return true;

     }
     else{
      this.user$.next(null);
       return false;
     }
  }

  AuthenticateUser(user:SocialUser)
  {
    return this.http.post(this.BaseUrl+"/Users/Authenticate",{'Token_Id':user.idToken})
  }
  

}
