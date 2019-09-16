import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListComponent } from './quiz-list.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';

fdescribe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;
  let spyQuizService;

  let stubbedValue = [];

  beforeEach(async(() => {
    const spyQuizObj = jasmine.createSpyObj('QuizService', ['getQuizzes']);

    stubbedValue = [
      { id: 1, title: 'First Quiz', description: 'This is my first quiz' },
      { id: 2, title: 'Second Quiz', description: 'This is my second quiz' }
    ];

    spyQuizObj.getQuizzes.and.returnValue(stubbedValue);

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
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getQuizzes should fetch quizzes from quizService', () => {
    spyQuizService = TestBed.get(QuizService);
    spyQuizService.getQuizzes.and.returnValue(of([{foo: 'bar'}]));
    component.getQuizzes().subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  });
});
