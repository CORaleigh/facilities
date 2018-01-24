https://stackoverflow.com/questions/36388270/angular-2-how-to-apply-limit-to-ngfor


Issue 1
progress spinner <mat-spinner [diameter]="70">
https://github.com/angular/material2/issues/7653

 <mat-card-content>
            <span *ngFor="let q of questions">
                {{ q.Question }}
                <br>
                <span *ngFor="let a of freeTextAnswers; let i=index">
                        
                    <ng-container *ngIf="q.QuestionId === a.QuestionId">
                        {{ a.Answer }}
                        <textarea matInput placeholder="Enter Text" matTextareaAutosize matAutosizeMinRows="2" matAutosizeMaxRows="5"></textarea>
                        <br>
                    </ng-container>
                    <ng-container *ngIf="q.QuestionId === a.QuestionId && a.AnswerFormat === 'THISTEXT'">
                        <mat-select *ngIf="i<1" required placeholder='Select an option...'>
                            <mat-option *ngFor="let x of answers">
                                            {{ x.Answer }}
                                        </mat-option>
                        </mat-select>
                        <br>
                    </ng-container>
                </span>
                <br>
            </span>
            <!-- <span *ngFor="let question of questions" [value]="question">{{questions.question}}</span> -->
        </mat-card-content>