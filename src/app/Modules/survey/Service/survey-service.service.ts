import { SurveyMaster, QuestionResponseModel } from './../Models/SurveyModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyServiceService {

  constructor(private http:HttpClient) { }
  BaseUrl="https://localhost:5001"
  // BaseUrl="https://113ddd882f5c.ngrok.io"
   getSurveyList()
   {
     return this.http.get(this.BaseUrl+"/Associate/GetSurveyList");
   }
   getSurveyQuestions(Survey:SurveyMaster)
   {
     return this.http.post(this.BaseUrl+"/Associate/Questions",Survey)
   }
   SubmitQuestions(responseMaster:QuestionResponseModel[],sm_Id)
   {
     return this.http.post(this.BaseUrl+"/Associate/RecordResponse",{sm_Id,responseMaster})
   }


}
