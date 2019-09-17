import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuizService } from '../quiz.service';
import {Quiz} from '../quiz';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[];

  constructor(private quizService: QuizService) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.quizService.getQuizzes();
  }

  ngOnInit() {
    this.getQuizzes().subscribe(
      data => this.quizzes = data,
      error => console.log(error)
    )
  }

}
