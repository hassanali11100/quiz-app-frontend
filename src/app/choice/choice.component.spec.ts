import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceComponent } from './choice.component';
import { ChoiceService } from '../choice.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ChoiceComponent', () => {
  let component: ChoiceComponent;
  let fixture: ComponentFixture<ChoiceComponent>;
  let spyChoiceService: jasmine.SpyObj<ChoiceService>;

  beforeEach(async(() => {
    const choiceObj = jasmine.createSpyObj('ChoiceService', ['getChoices']);

    TestBed.configureTestingModule({
      declarations: [ ChoiceComponent ],
      providers: [
        { provide: ChoiceService, useValue: choiceObj }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();

    spyChoiceService = TestBed.get(ChoiceService);
    fixture = TestBed.createComponent(ChoiceComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getChoices should get all choices', () => {
    const stubbedChoices = [
      {
          id: 8,
          text: "62",
          "is_correct?": false,
          question_id: 8
      },
      {
          id: 10,
          text: "65",
          "is_correct?": true,
          question_id: 8
      },
      {
          id: 11,
          text: "70",
          "is_correct?": false,
          question_id: 8
      }
    ];

    spyChoiceService.getChoices.and.returnValue(of(stubbedChoices));

    component.quizId = 1;
    component.questionId = 1;
    expect(component.choices).toBe(undefined);

    component.getChoices();
    expect(component.choices).toEqual(stubbedChoices)
  });

  it('choices should get populated on ngOnInit', () => {
    const stubbedChoices = [
      {
          id: 8,
          text: "62",
          "is_correct?": false,
          question_id: 8
      },
      {
          id: 10,
          text: "65",
          "is_correct?": true,
          question_id: 8
      },
      {
          id: 11,
          text: "70",
          "is_correct?": false,
          question_id: 8
      }
    ];

    spyChoiceService.getChoices.and.returnValue(of(stubbedChoices));

    component.quizId = 1;
    component.questionId = 1;
    expect(component.choices).toBe(undefined);

    component.ngOnInit();
    expect(component.choices).toEqual(stubbedChoices);
  });
});

