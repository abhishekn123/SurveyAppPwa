import { SurveyServiceService } from './../Service/survey-service.service';
import { SurveyMaster } from './../Models/SurveyModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-home',
  templateUrl: './survey-home.component.html',
  styleUrls: ['./survey-home.component.css']
})
export class SurveyHomeComponent implements OnInit {

  constructor(private service:SurveyServiceService,private router:Router) { }
  SurveyMaster:SurveyMaster[]=[];
  isLoading=false;
  ngOnInit(): void {
    this.isLoading=true;
    this.service.getSurveyList().subscribe((data:SurveyMaster[])=>
      {
        this.isLoading=false;
        console.log(data);
        this.SurveyMaster=data;
      })

  }
  GetQuestion(survey:SurveyMaster)
  {
    console.log("Survey Status",survey.status)
    // if(survey.status=="NOT STARTED")
    // {
         this.router.navigate(["Questions"],{queryParams:{"data":JSON.stringify(survey)}});
    // }
  }

}
