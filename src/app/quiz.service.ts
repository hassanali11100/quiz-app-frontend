import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient) { }

  // getQuizzes(): Observable<Quiz[]> {
  //   return this.httpClient.get('/quizzes') as Observable<Quiz[]>;
  // }

  /** GET heroes from the server */
  getQuizzes(): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>('/quizzes')
      .pipe(
        tap(heroes => console.log(`fetched heroes`)),
        catchError(err => throwError("Error thrown from catchError"))
      ) as Observable<Quiz[]>;
  }

  deleteQuiz(id: number): Observable<Quiz> {
    return this.httpClient.delete<Quiz>(`/quizzes/${id}`).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)
      )
    );
  }
}
