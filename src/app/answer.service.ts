import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Answer } from './answer';
import { Observable, zip } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  addAnswer(quizId: number, questionId: number, answerBody: Answer): Observable<Answer> {
    return this.httpClient.post<Answer>(`quizzes/${quizId}/questions/${questionId}/answers`, JSON.stringify(answerBody), this.httpOptions)
      .pipe(
        tap(data => console.log(data))
      ) as Observable<Answer>;
  }

  addAllAnswersOfQuiz(quizId: number, answers: object) {
    const answerObservables = [];

    for (const [key, value] of Object.entries(answers)) {
      answerObservables.push(this.addAnswer(quizId, parseInt(key.toString()), {choice_id: value}));
    }

    const allAnswers = zip(...answerObservables);

    allAnswers.subscribe(
      data => console.log(data)
    )
  }
}
