import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListComponent } from './quiz-list.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;
  let spyQuizService;

  beforeEach(async(() => {
    const spyQuizObj = jasmine.createSpyObj('QuizService', ['getQuizzes', 'deleteQuiz']);


    TestBed.configureTestingModule({
      declarations: [ QuizListComponent ],
      providers: [{
        provide: QuizService, useValue: spyQuizObj
      }],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    spyQuizService = TestBed.get(QuizService);
    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getQuizzes should fetch quizzes from quizService', () => {
    const stubbedValue = [
      { id: 1, title: 'First Quiz', description: 'This is my first quiz' },
      { id: 2, title: 'Second Quiz', description: 'This is my second quiz' }
    ];
    spyQuizService.getQuizzes.and.returnValue(of(stubbedValue));

    component.getQuizzes().subscribe(
      data => expect(data).toEqual(stubbedValue),
      error => console.log(error)
    )
  });

  it('Quizzes should get populated on ngOnInit', () => {
    expect(component.quizzes).toBe(undefined);
    const stubbedValue = [
      { id: 1, title: 'First Quiz', description: 'This is my first quiz' },
      { id: 2, title: 'Second Quiz', description: 'This is my second quiz' }
    ];
    spyQuizService.getQuizzes.and.returnValue(of(stubbedValue));

    component.ngOnInit();

    expect(component.quizzes).toBe(stubbedValue);
  });

  it('#deleteQuiz should delete quiz', () => {
    const stubbedValue = {id: 1, title: 'Quiz One', description: 'This quiz is to be deleted'}
    spyQuizService.deleteQuiz.and.returnValue(of(stubbedValue));
    expect(component.deleteMessage).toBe(undefined);
    component.deleteQuiz(stubbedValue.id);
    expect(component.deleteMessage).toContain('deleted');
  });

  describe('HTML Page Testing', () => {
    beforeEach(() => {
      const stubbedValue = [
        { id: 1, title: 'First Quiz', description: 'This is my first quiz' },
        { id: 2, title: 'Second Quiz', description: 'This is my second quiz' }
      ];
      spyQuizService.getQuizzes.and.returnValue(of(stubbedValue));
    })

    it('html page should display title "Quiz Dashboard"', () => {
      fixture.detectChanges();
  
      const quizTableElement: HTMLElement = fixture.nativeElement;
      const tableHeading = quizTableElement.querySelector('h2');
      expect(tableHeading.textContent).toContain('Quiz Dashboard');
    });

    it('html page should load list of quizzes', () => {
      fixture.detectChanges();

      const quizTableElement: HTMLElement = fixture.nativeElement;
      const tableBody = quizTableElement.querySelectorAll('tbody tr td.title');
      const tableBodyArray = Array.from(tableBody);

      expect(tableBodyArray.map((el) => el.textContent)).toEqual(['First Quiz', 'Second Quiz']);
    });

    it('html page should delete quiz', () => {
      const stubbedValue = {id: 1, title: 'Quiz One', description: 'This quiz is to be deleted'}
      spyQuizService.deleteQuiz.and.returnValue(of(stubbedValue));

      expect(component.deleteMessage).toBe(undefined);
      
      fixture.detectChanges();
      
      const anchorTag = fixture.debugElement.query(By.css('tbody tr td a'))
      anchorTag.nativeElement.click();

      expect(component.deleteMessage).toContain('deleted');
    });
  });
});
