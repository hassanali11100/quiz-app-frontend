import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('QuizService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let quizService: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QuizService
      ]
    })

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    quizService = TestBed.get(QuizService);
  });

  it('should be created', () => {
    expect(quizService).toBeTruthy();
  });

  it('#getQuizzes should return expected Quizzes', () => {
    const expectedQuizzes = [
      {id: 1, title: 'kashmir issue', description: 'it contains questions regarding kashmir'},
      {id: 2, title: 'economic crisis', description: 'it contains question regarding economy'}
    ];

    quizService.getQuizzes().subscribe(
      (quizzes) => expect(quizzes).toEqual(expectedQuizzes),
      fail
    );

    const req = httpTestingController.expectOne('/quizzes');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedQuizzes);
  });
});
