import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListComponent } from './quiz-list.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';

fdescribe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;
  let spyQuizService;

  beforeEach(async(() => {
    const spyQuizObj = jasmine.createSpyObj('QuizService', ['getQuizzes']);

    TestBed.configureTestingModule({
      declarations: [ QuizListComponent ],
      providers: [{
        provide: QuizService, useValue: spyQuizObj
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyQuizService = TestBed.get(QuizService);
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

    // component.getQuizzes().subscribe(
    //   data => expect(data).toEqual(stubbedValue),
    //   error => console.log(error)
    // )
  });
});
