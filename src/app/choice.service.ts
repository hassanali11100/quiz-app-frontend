import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Choice } from './choice';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {

  }

  getChoices(quizId: number, questionId: number): Observable<Choice[]> {
    return this.httpClient.get<Choice[]>(`quizzes/${quizId}/questions/${questionId}/choices`)
      .pipe(
        tap(data => console.log(data))
      ) as Observable<Choice[]>;
  }

  addChoice(quizId: number, questionId: number, choiceBody: Choice): Observable<Choice> {
    return this.httpClient.post<Choice>(`quizzes/${quizId}/questions/${questionId}/choices`, choiceBody)
      .pipe(
        tap(data => console.log(data))
      ) as Observable<Choice>;
  }
}
