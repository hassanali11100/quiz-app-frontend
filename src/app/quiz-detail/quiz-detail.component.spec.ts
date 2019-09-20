import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDetailComponent } from './quiz-detail.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('QuizDetailComponent', () => {
  let component: QuizDetailComponent;
  let fixture: ComponentFixture<QuizDetailComponent>;
  let spyQuizService;

  // TODO: Fix this
  const fakeActivatedRoute = {
    snapshot: { paramMap: { 
      get: function() {return 1;} }
    }
  };

  // TODO: look why async is used in beforeEach
  beforeEach(async(() => {
    const spyServiceObj = jasmine.createSpyObj('QuizService', ['getQuiz'])
    TestBed.configureTestingModule({
      declarations: [ QuizDetailComponent ],
      providers: [
        {provide: QuizService, useValue: spyServiceObj},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyQuizService = TestBed.get(QuizService);
    fixture = TestBed.createComponent(QuizDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  describe('Component class tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('#getQuiz should fetch details of a quiz', () => {
      // stub getquiz from service
      const stubbedQuiz = {id: 1, title: '1st Quiz', description: 'This is a description of first quiz'};
      spyQuizService.getQuiz.and.returnValue(of(stubbedQuiz));

      component.getQuizDetail(1).subscribe(
        data => expect(data).toEqual(stubbedQuiz)
      );
    })

    it('should load QuizDetail on ngOnInit', () => {
      const stubbedQuiz = {id: 1, title: '1st Quiz', description: 'This is a description of first quiz'};
      spyQuizService.getQuiz.and.returnValue(of(stubbedQuiz));
      component.quizId = 1;

      expect(component.currentQuiz).toBe(undefined)
      component.ngOnInit();
      expect(component.currentQuiz).toEqual(stubbedQuiz);
    });
  })
});
