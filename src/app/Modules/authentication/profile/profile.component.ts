import { AuthenticationService } from './../service/authentication.service';
import { SocialUser } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private AuthService:AuthenticationService) { }
  User:SocialUser;
  ngOnInit(): void {
    
   this.AuthService.user$.subscribe(data=>
    {
      this.User=data;
    })
  }

}
