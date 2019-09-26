import { TestBed } from '@angular/core/testing';

import { ChoiceService } from './choice.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ChoiceService', () => {
  let testingHttpController;
  let httpClient;
  let choiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ChoiceService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    testingHttpController = TestBed.get(HttpTestingController);
    choiceService = TestBed.get(ChoiceService);
  });

  it('should be created', () => {
    const service: ChoiceService = TestBed.get(ChoiceService);
    expect(service).toBeTruthy();
  });

  it('#getChoices should fetch all choices', () => {
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

    choiceService.getChoices(1, 1).subscribe(
      data => expect(data).toEqual(stubbedChoices)
    )

    const req = testingHttpController.expectOne('quizzes/1/questions/1/choices');
    expect(req.request.method).toBe('GET');

    req.flush(stubbedChoices);
  });

  it('#addChoice should create a choice', () => {
    const stubbedChoice = {
      text: "test choice",
      "is_correct?": false
    };

    choiceService.addChoice(1, 8).subscribe(
      (data) => expect(data).toEqual(stubbedChoice)
    );

    const req = testingHttpController.expectOne('quizzes/1/questions/8/choices');
    expect(req.request.method).toBe('POST');

    req.flush(stubbedChoice);
  });
});
