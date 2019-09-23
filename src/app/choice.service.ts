import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Choice } from './choice';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  constructor(private httpClient: HttpClient) {

  }

  getChoices(quizId: number, questionId: number): Observable<Choice[]> {
    return this.httpClient.get<Choice[]>(`quizzes/${quizId}/questions/${questionId}/choices`)
      .pipe(
        tap(data => console.log(data))
      ) as Observable<Choice[]>;
  }
}
