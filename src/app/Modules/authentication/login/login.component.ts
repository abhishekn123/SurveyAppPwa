import { HelperService } from './../../helper/services/helper.service';
import { AuthenticationService } from './../service/authentication.service';
import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Helper:HelperService,private GoogleLogin:SocialAuthService,private AuthService:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  GetToken()
  {
    this.GoogleLogin.authState.subscribe(data=>
      {
        console.log(data);
      })
  }
Login():void{
  this.Helper.GlobalLoader.next(true);
  this.GoogleLogin.signIn(GoogleLoginProvider.PROVIDER_ID,{popup: true}).then((user:SocialUser)=>
  {
    console.log(user)

    this.AuthService.AuthenticateUser(user).subscribe(data=>
      {
        this.Helper.GlobalLoader.next(false);
        localStorage.setItem("Token",data['token']);
        this.AuthService.user$.next(user);
        this.route.navigate(['/Home']);
      },err=>
      {
        this.Helper.GlobalLoader.next(false);
      })
  }).catch(err=>
    {
      this.Helper.GlobalLoader.next(false);
      this.AuthService.user$.next(null);
      console.log(err);
    })
}
}
