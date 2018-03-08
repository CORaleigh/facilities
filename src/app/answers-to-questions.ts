export interface AnswersToQuestions {
    questions: Question[];
  }
 export interface Question {
    ProblemSid: number;
    Question: string;
    QuestionAnswers?: any;
    QuestionId: number;
    QuestionSequence: number;
    AnswersForQuestion: AnswersForQuestion[];
  }
 export interface AnswersForQuestion {
    Answer: string;
    AnswerFormat: string;
    AnswerId: number;
    AnswerSequence: number;
    DispatchTo: number;
    DispatchToFieldName: string;
    NextQuestionId: number;
    Priority: string;
    QuestionId: number;
    SubmitTo: number;
    SubmitToFieldName: string;
    SubmitToLayerName: string;
    TellCaller: string;
  }
