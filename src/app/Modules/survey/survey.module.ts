import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyCardComponent } from './survey-card/survey-card.component';
import { SurveyHomeComponent } from './survey-home/survey-home.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [SurveyCardComponent, SurveyHomeComponent, QuestionsComponent],
  imports: [
    CommonModule,MaterialModule,HttpClientModule,ReactiveFormsModule,FormsModule, NgxSkeletonLoaderModule,
  ],
  exports:[SurveyCardComponent]
})
export class SurveyModule { }
