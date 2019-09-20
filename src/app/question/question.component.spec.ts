import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { QuestionService } from '../question.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    const questionServiceObj = jasmine.createSpyObj('QuestionService', ['getQuestions'])
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ],
      providers: [
        { provide: QuestionService, useValue: questionServiceObj },
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
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

  it('#getQuestions Should return questions of a quiz', () => {
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

    component.getQuestions(1).subscribe(
      data => expect(data).toEqual(stubbedQuestions)
    )
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
});
