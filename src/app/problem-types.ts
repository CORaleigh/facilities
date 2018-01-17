type JSON = ProblemTypes

export interface ProblemTypes {
  ErrorMessages: any[];
  Message: any;
  Status: number;
  SuccessMessages: any[];
  Value: IValue[];
  WarningMessages: any[];
}

export interface IValue {
  Description: string;
  DomainId: number;
  OtherSysCode: string;
  OtherSysDesc1: string;
  OtherSysDesc2: string;
  ProblemCode: string;
  ProblemSid: number;
}
