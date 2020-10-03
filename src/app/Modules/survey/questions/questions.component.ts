import { SurveyMaster, QuestionViewModel, QuestionResponseModel, optionMaster } from './../Models/SurveyModel';
import { SurveyServiceService } from './../Service/survey-service.service';
import { AuthenticationService } from './../../authentication/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private SurveyService:SurveyServiceService,private _formBuilder:FormBuilder) { }
  SurveyData:SurveyMaster;
  Questions:any[]=[]
  SurvyQuestions:Map<number,QuestionResponseModel>;
  ResponseModel:QuestionResponseModel[]=[];
  CheckBoxResponse:Map<number,QuestionResponseModel>;
  ServerQuestions:QuestionViewModel[] =[]
  isLoading:Boolean=false;
  isSubmiting:Boolean=false;
  ngOnInit(): void {
    this.isLoading=true;
    this.SurvyQuestions=new Map();
    this.CheckBoxResponse=new Map();
    this.route.queryParams.subscribe((data)=>
    {
     this.SurveyData=<SurveyMaster>JSON.parse(data.data);
    })

    this.SurveyService.getSurveyQuestions(this.SurveyData).subscribe((data:QuestionViewModel[])=>
      {
        this.initQuestions(data);
        this.ServerQuestions=data;
        console.log("data From Server",data);
        this.isLoading=false;
      })
  }
  OptionChange(event:MatRadioButton,SurveyId:number,index)
  {
    this.SurvyQuestions.set(event.value.qM_Id,new QuestionResponseModel(SurveyId,event.value.qM_Id,event.value.oM_Id,event.value.options))
    console.log("Map",this.SurvyQuestions)
  }

  initQuestions(Questions:QuestionViewModel[])
  {
    for(let Question of Questions)
    {

         let SurveyQuestion = this._formBuilder.group(
        {"sM_Id":new FormControl(Question.sM_Id),
          "questionMaster":new FormGroup(
            {
              "qM_Id":new FormControl(Question.questionMaster.qM_Id),
              "qM_QuestionName":new FormControl(Question.questionMaster.qM_QuestionName),
              "optionType":new FormControl(Question.questionMaster.optionType),
              "sM_Id":new FormControl(Question.questionMaster.sM_Id),
            }
          ),
          "optionMaster":new FormArray([])
       }
     )
     let index=0;
      for(let option of Question.optionMaster)
      {

        let optionItem =new FormGroup({
          "oM_Id":new FormControl(option.oM_Id),
          "options":new FormControl(option.options),
          "qM_Id":new FormControl(option.qM_Id),
         })
         let OptionMaster= SurveyQuestion.get('optionMaster') as FormArray;
         OptionMaster.insert(index,optionItem);
         index++;
      }
     this.Questions.push(SurveyQuestion);
     console.log("controls")
    }
   console.log("Questions Array",this.Questions);
  }

  TextBoxUpdate(text:string,QuestionId,SurveyId,index:number)
  {
    let ItemIndex= this.ResponseModel.findIndex(exp=>exp.RM_QuestionId===QuestionId);
    if(text.length>0)
    {
      this.SurvyQuestions.set(QuestionId,new QuestionResponseModel(SurveyId,QuestionId,0,text))
    }
    else{
      this.SurvyQuestions.delete(QuestionId)
  }
  console.log('Map',this.SurvyQuestions);
}
DropDownUpdate(event,surveyId,index)
{
  this.SurvyQuestions.set(event.qM_Id,new QuestionResponseModel(surveyId,event.qM_Id,event.oM_Id,event.options))
}
CheckBoxUpdate(option:optionMaster,event,surveyId,index)
{
  if(!event.checked)
  {
    this.CheckBoxResponse.delete(option.oM_Id);
  }
  else
  {
    this.CheckBoxResponse.set(option.oM_Id,new QuestionResponseModel(surveyId,option.qM_Id,option.oM_Id,option.options))
  }
  console.log("Map",this.CheckBoxResponse)
}
SUBMIT():void{
  let Responses:QuestionResponseModel[]=[];
  this.isSubmiting=true;
  for (let item of this.SurvyQuestions.values())
  {
   Responses.push(item);
  }
  for(let item of this.CheckBoxResponse.values())
  {
    Responses.push(item);
  }

  this.SurveyService.SubmitQuestions(Responses,this.ServerQuestions[0].sM_Id).subscribe(data=>
    {
      console.log("Response Submitted Successfully")
      this.isSubmiting=false;
      this.router.navigate(['/Home'])
    },err=>
    {
      console.log(err);
      this.isSubmiting=false;
    })
}

}
