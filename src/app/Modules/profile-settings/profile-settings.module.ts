import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,MaterialModule
  ]
})
export class ProfileSettingsModule { }
