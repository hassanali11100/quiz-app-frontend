import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('QuestionService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let questionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        QuestionService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    questionService = TestBed.get(QuestionService);
  });

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });

  it('#getQuestions should fetch question of a quiz', () => {
    const stubbedQuestions = [
      {
          id: 3,
          text: "This is a test question",
          quiz_id: 1,
          created_at: "2019-09-05T06:10:42.471Z",
          updated_at: "2019-09-05T06:10:42.471Z"
      },
      {
          id: 4,
          text: "This is a 2nd test question",
          quiz_id: 1,
          created_at: "2019-09-05T07:20:31.971Z",
          updated_at: "2019-09-05T07:20:31.971Z"
      }
    ];

    questionService.getQuestions(1).subscribe(
      data => expect(data).toEqual(stubbedQuestions)
    );

    const req = httpTestingController.expectOne('quizzes/1/questions');
    expect(req.request.method).toEqual('GET');

    req.flush(stubbedQuestions);
  });

  it('#addQuestion should return the newly created question', () => {
    const stubbedQuestion = {
      id: 6,
      text: "This is fourth question?",
      quiz_id: 1
    };

    questionService.addQuestion(1, {text: stubbedQuestion.text}).subscribe(
      data => expect(data).toEqual(stubbedQuestion)
    );

    const req = httpTestingController.expectOne('quizzes/1/questions');
    expect(req.request.method).toBe('POST');

    req.flush(stubbedQuestion);
  });
});
