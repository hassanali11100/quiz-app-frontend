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

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.quizService.getQuizzes();
  }

}
