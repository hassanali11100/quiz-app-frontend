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
      const tableHeading = quizTableElement.querySelector('.quiz-table th')
      expect(tableHeading.textContent).toContain('Quiz Dashboard');
    });

    it('html page should load list of quizzes', () => {
      fixture.detectChanges();

      const quizTableElement: HTMLElement = fixture.nativeElement;
      const tableBody = quizTableElement.querySelectorAll('tbody tr td.title');
      const tableBodyArray = Array.from(tableBody);

      expect(tableBodyArray.map((el) => el.textContent)).toEqual(['First Quiz', 'Second Quiz']);
    });
  });
});
