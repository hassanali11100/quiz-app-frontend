import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { QuestionService } from '../question.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let spyQuestionService: jasmine.SpyObj<QuestionService>

  // TODO: Fix this
  const fakeActivatedRoute = {
    snapshot: { paramMap: { 
      get: function() {return 1;} }
    }
  };
  
  beforeEach(async(() => {
    const questionServiceObj = jasmine.createSpyObj('QuestionService', ['getQuestions', 'addQuestion'])
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ],
      providers: [
        { provide: QuestionService, useValue: questionServiceObj },
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ],
      imports: [
        AngularFontAwesomeModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyQuestionService = TestBed.get(QuestionService);
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('#getQuestions Should return questions of a quiz', () => {
  //   const stubbedQuestions = [
  //     {
  //         id: 3,
  //         text: "This is a test question",
  //         quiz_id: 1
  //     },
  //     {
  //         id: 4,
  //         text: "This is a 2nd test question",
  //         quiz_id: 1
  //     }
  //   ];
  //   spyQuestionService.getQuestions.and.returnValue(of(stubbedQuestions));

  //   component.getQuestions(1).subscribe(
  //     data => expect(data).toEqual(stubbedQuestions)
  //   )
  // });

  it('should load questions on ngOnInit', () => {
    const stubbedQuestions = [
      {
          id: 3,
          text: "This is a test question",
          quiz_id: 1
      },
      {
          id: 4,
          text: "This is a 2nd test question",
          quiz_id: 1
      }
    ];
    spyQuestionService.getQuestions.and.returnValue(of(stubbedQuestions));

    expect(component.questions).toBe(undefined);
    component.ngOnInit();
    expect(component.questions).toEqual(stubbedQuestions);
  });

  it('should load questions on ngOnInit', () => {
    const stubbedQuestions = [
      {
          id: 3,
          text: "This is a test question",
          quiz_id: 1
      },
      {
          id: 4,
          text: "This is a 2nd test question",
          quiz_id: 1
      }
    ];
    spyQuestionService.getQuestions.and.returnValue(of(stubbedQuestions));

    expect(component.questions).toBe(undefined);
    component.ngOnInit();
    expect(component.questions).toEqual(stubbedQuestions);
  });

  it('clicking an add-icon should set isDisplayQuestionForm to true', () => {
    expect(component.isDisplayQuestionForm).toBe(false);
    component.toggleDisplayForm();
    expect(component.isDisplayQuestionForm).toBe(true);
  });

  it('#addQuestion should add question to the new list', () => {
    component.questions = [
      {
          id: 3,
          text: "This is a test question",
          quiz_id: 1
      },
      {
          id: 4,
          text: "This is a 2nd test question",
          quiz_id: 1
      }
    ];

    const stubbedQuestion = {
      id: 5,
      text: "This is a 5th test question",
      quiz_id: 1
    };
    spyQuestionService.addQuestion.and.returnValue(of(stubbedQuestion));

    component.addQuestion(stubbedQuestion);
    expect(component.questions).toContain(stubbedQuestion);
  });
});
