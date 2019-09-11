import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Quiz } from './quiz-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiurl = 'quizzes';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  perfop = {
    headers: this.headers
  }

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiurl);
  }

  getQuiz(id: number): Observable<Quiz> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<Quiz>(url).pipe(
      catchError(this.handleError)
    );
  }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiurl, quiz, this.perfop).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  deleteQuiz(id: number): Observable<Quiz> {
    const url = `${this.apiurl}/${id}`;
    return this.http.delete<Quiz>(url);
  }
}
