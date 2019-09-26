import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { Observable } from 'rxjs';
import { QuestionService } from '../question.service';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizId: number;
  currentQuiz: Quiz;
  questions: Question[];
  model: object = {};

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService) {
    this.quizId = parseInt(this.route.snapshot.paramMap.get('quiz_id'));
  }

  ngOnInit() {
    this.getQuestions(this.quizId).subscribe(
      data => this.questions = data
    )
    this.quizService.getQuiz(this.quizId).subscribe(
      data => this.currentQuiz = data
    )
  }

  getQuestions(quizId: number): Observable<Question[]> {
    return this.questionService.getQuestions(quizId);
  }

  submitQuizAnswers(data) {
    console.log(this.model);
  }
}
