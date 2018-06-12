export class CityworksRequest {
    ProblemSid: any;
    Details?: any;
    Priority?: any;
    SubmitToSid?: number;
    DispatchToSid?: number;
    Comments?: string;
    Address?: any;
    StreetName?: any;
    AptNum?: any;
    City?: any;
    State?: any;
    Zip?: any;
    Landmark?: any;
    District?: any;
    Location?: any;
    X?: number;
    Y?: number;
    Shop?: any;
    MapPage?: any;
    TileNo?: any;
    OtherSystemId: number;
    InitiatedByApp?: any;
    Text1?: any;
    Text2?: any;
    Text3?: any;
    Text4?: any;
    Text5?: any;
    Text6?: any;
    Text7?: any;
    Text8?: any;
    Text9?: any;
    Text10?: any;
    Text11?: any;
    Text12?: any;
    Text13?: any;
    Text14?: any;
    Text15?: any;
    Text16?: any;
    Text17?: any;
    Text18?: any;
    Text19?: any;
    Text20?: any;
    Num1?: any;
    Num2?: any;
    Num3?: any;
    Num4?: any;
    Num5?: any;
    Date1?: any;
    Date2?: any;
    Date3?: any;
    Date4?: any;
    Date5?: any;
    CallerType?: any;
    CallerCallTime?: any;
    CallerAcctNum?: any;
    CallerTitle?: any;
    CallerFirstName?: any;
    CallerMiddleInitial?: any;
    CallerLastName?: any;
    CallerAddress?: string;
    CallerAptNum?: any;
    CallerCity?: any;
    CallerState?: any;
    CallerZip?: any;
    CallerDistrict?: any;
    CallerHomePhone?: any;
    CallerWorkPhone?: any;
    CallerCellPhone?: any;
    CallerOtherPhone?: any;
    CallerFax?: any;
    CallerEmail?: any;
    CallerIsOwner?: any;
    CallerIsFollowUpCall?: any;
    CallerComments?: string;
    CallerText1?: any;
    CallerText2?: any;
    CallerText3?: any;
    CallerText4?: any;
    CallerText5?: any;
    CustomFieldValues?: any;
    Answers?: AnswerCHF[];
    SubmitTo?: any;
    DispatchTo?: any;
}

export interface AnswerCHF {
    AnswerId: number;
    AnswerValue: string;
}
