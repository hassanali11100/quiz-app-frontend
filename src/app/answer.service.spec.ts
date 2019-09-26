import { TestBed } from '@angular/core/testing';

import { AnswerService } from './answer.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AnswerService', () => {
  let testingHttpController: HttpTestingController;
  let httpClient: HttpClient;
  let answerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AnswerService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    testingHttpController = TestBed.get(HttpTestingController);
    answerService = TestBed.get(AnswerService);
  });

  it('should be created', () => {
    const service: AnswerService = TestBed.get(AnswerService);
    expect(service).toBeTruthy();
  });

  it('#addAnswer should add answer to the quiz', () => {
    const answerBody = {
      "choice_id": "4",
      "is_correct?": false
    };

    const stubbedAnswerResponse = {
      id: 1,
      "is_correct?": false,
      question_id: 8,
      choice_id: 9
    }

    answerService.addAnswer(1, 2, answerBody).subscribe(
      data => expect(data).toEqual(stubbedAnswerResponse)
    );

    const req = testingHttpController.expectOne('quizzes/1/questions/2/answers');
    expect(req.request.method).toBe('POST');

    req.flush(stubbedAnswerResponse);
  });
});
