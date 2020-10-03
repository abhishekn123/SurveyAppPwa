import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [ProfileComponent, LoginComponent],
  imports: [
    CommonModule,MaterialModule
  ],
  exports:[ProfileComponent]
})
export class AuthenticationModule { }
