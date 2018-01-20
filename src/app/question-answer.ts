export interface QuestionAnswer {
    Value: Value;
    Status: number;
    Message?: any;
    ErrorMessages: any[];
    WarningMessages: any[];
    SuccessMessages: any[];
  }
  
  export interface Value {
    BranchingModel: boolean;
    Questions: Question[];
    Answers: Answer[];
  }
  
  export interface Answer {
    QuestionId: number;
    NextQuestionId: number;
    Priority: string;
    AnswerSequence: number;
    Answer: string;
    AnswerId: number;
    TellCaller: string;
    AnswerFormat: string;
    SubmitTo: number;
    DispatchTo: number;
    SubmitToLayerName: string;
    SubmitToFieldName: string;
    DispatchToFieldName: string;
  }
  
  export interface Question {
    QuestionAnswers?: any;
    QuestionId: number;
    ProblemSid: number;
    Question: string;
    QuestionSequence: number;
  }