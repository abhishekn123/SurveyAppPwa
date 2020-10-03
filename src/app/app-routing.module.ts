import { UserProfileComponent } from './Modules/profile-settings/user-profile/user-profile.component';
import { QuestionsComponent } from './Modules/survey/questions/questions.component';
import { SurveyHomeComponent } from './Modules/survey/survey-home/survey-home.component';
import { IsAuthenticatedGuard } from './Modules/authentication/Guards/is-authenticated.guard';
import { LoginComponent } from './Modules/authentication/login/login.component';
import { SurveyCardComponent } from './Modules/survey/survey-card/survey-card.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"Home",component:SurveyHomeComponent,canActivate:[IsAuthenticatedGuard]},
  {path:"Questions",component:QuestionsComponent},
  {path:"Login",component:LoginComponent},
  {path:"Profile",component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
