import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  getQuestions(quizId: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`quizzes/${quizId}/questions`)
      .pipe(
        tap(questions => console.log(questions))
      ) as Observable<Question[]>;
  }
}
