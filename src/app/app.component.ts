import { HelperService } from './Modules/helper/services/helper.service';
import { AuthenticationService } from './Modules/authentication/service/authentication.service';
import { SocialAuthService } from 'angularx-social-login';
import { SurveyMaster } from './Modules/survey/Models/SurveyModel';
import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Observer, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  SurveyData:SurveyMaster[];
  constructor(private helper:HelperService,private router:Router,private SocialServie:SocialAuthService,private Auth:AuthenticationService)
  {
  }
 isOffline:Boolean=false;
 isProgress:Boolean=false;
 navigateToProfile()
 {
   this.router.navigate(['/Profile'])
   this.sidenav.close()
 }
  ngOnInit(): void {
    this.helper.GlobalLoader.subscribe({next:(data)=>{
      this.isProgress=data;
    }})
      this.SocialServie.authState.subscribe(user=>
        {     
          this.Auth.user$.next(user);
          console.log(user);
          this.router.navigate(["/Home"]);
        },err=>
        {
          this.router.navigate(["/Login"]);
        })
    addEventListener('offline',(event)=>
    {
      console.log(event)
      this.isOffline=true;
    })
    addEventListener('online',(event)=>
    {
      console.log('online')
      this.isOffline=false
    })
   
  }
  title = 'Survey';
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  navigateToHome()
  {
    this.router.navigate(['/Home'])
    this.sidenav.close()
  }
}
