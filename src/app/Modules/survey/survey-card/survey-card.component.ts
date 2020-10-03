import { SurveyMaster } from './../Models/SurveyModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-card',
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.css']
})
export class SurveyCardComponent implements OnInit {
  
  // @Input() Status:string;
  @Input() SurveyMaster:SurveyMaster 
  @Input() Index:number
  isLoading=true;
  constructor() { }

  ngOnInit(): void {
    console.log()
  }
  GetStatus():{status,color}
  {
    if(this.SurveyMaster.status==="COMPLETED")
    {
      return {"status":"Completed","color":"primary"}
    }
    else
    if(this.SurveyMaster.status==="NOT STARTED")
    {
      if(new Date(this.SurveyMaster.endDate)<new Date())
      {
        return {"status":"Expired","color":"warn"}
      }
      else{
        return {"status":"pending","color":"accent"}
      }
    }
  }

}
