export class SurveyMaster {
  constructor(
    sM_Id: number,

    sM_Name: string,

    startDate: string,

    endDate: string,

    status: string
  ) {
    this.sM_Id = sM_Id;
    this.sM_Name = sM_Name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
  sM_Id: number;

  sM_Name: string;

  startDate: string;

  endDate: string;

  status: string;
}

export class QuestionViewModel {
  constructor(
    sM_Id: number,
    optionMaster: optionMaster[],
    questionMaster: questionMaster
  ) {
      this.optionMaster=optionMaster;
      this.questionMaster=questionMaster;
      this.sM_Id=sM_Id;
  }

  sM_Id: number;
  optionMaster: optionMaster[];
  questionMaster: questionMaster;
}
export class questionMaster {
  qM_Id: number;
  qM_QuestionName: string;
  optionType: string;
  sM_Id: number;
  surveyMaster: object = null;
  constructor(
    sM_Id: number,
    qM_Id: number,
    qM_QuestionName,
    optionType: string
  ) {
    this.sM_Id = sM_Id;
    this.qM_Id = qM_Id;
    this.qM_QuestionName = qM_QuestionName;
    this.optionType = optionType;
  }
}
export class optionMaster {
  oM_Id: number;
  options: string;
  qM_Id: number;
  questionMaster: object = null;
  selected:string=''
  constructor(oM_Id: number, options: string, qM_Id: number) {
    this.oM_Id = oM_Id;
    this.qM_Id = qM_Id;
    this.options = options;
  }
}

export class QuestionResponseModel
{
  
    RM_SurveyId:number;
    RM_QuestionId:number;
    RM_OptionId:number;
    RM_OptionValue:string;
    constructor( RM_SurveyId:number,
      RM_QuestionId:number,
      RM_OptionId:number,
      RM_OptionValue:string)
    {
      this.RM_SurveyId=RM_SurveyId;
      this.RM_QuestionId=RM_QuestionId;
      this.RM_OptionId=RM_OptionId;
      this.RM_OptionValue=RM_OptionValue;
    }

    
}
