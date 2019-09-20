import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getQuestions(quizId: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`quizzes/${quizId}/questions`)
      .pipe(
        tap(questions => console.log(questions))
      ) as Observable<Question[]>;
  }

  addQuestion(quizId: number, questionBody: Question) {
    return this.httpClient.post<Question>(`quizzes/${quizId}/questions`, JSON.stringify(questionBody), this.httpOptions)
      .pipe(
        tap(question => console.log(question))
      ) as Observable<Question>;
  }
}
