import { AuthenticationService } from './../../authentication/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private Auth:AuthenticationService,private socialService:SocialAuthService) { }
   User:SocialUser;
    time = Date.now()
    
  ngOnInit(): void {
   this.socialService.authState.subscribe(user=>
    {
      this.User=user;
    })
  }

}
