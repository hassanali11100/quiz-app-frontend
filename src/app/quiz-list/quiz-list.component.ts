import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  getQuizzes() {
    return this.quizService.getQuizzes();
  }

}
