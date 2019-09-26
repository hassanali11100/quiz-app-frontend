import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { Observable } from 'rxjs';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizId: number;
  questions: Question[];
  model: object = {};

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService) {
    this.quizId = parseInt(this.route.snapshot.paramMap.get('quiz_id'));
  }

  ngOnInit() {
    this.getQuestions(this.quizId).subscribe(
      data => this.questions = data
    )
  }

  getQuestions(quizId: number): Observable<Question[]> {
    return this.questionService.getQuestions(quizId);
  }

  submitQuizAnswers(data) {
    console.log(this.model);
  }
}
