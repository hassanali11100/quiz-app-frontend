import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizId: number;
  questions: Question[];
  isDisplayQuestionForm: boolean = false;
  model: object = {};

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute) { 
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

  toggleDisplayForm() {
    this.isDisplayQuestionForm = !this.isDisplayQuestionForm;
  }

  addQuestion(data) {
    return this.questionService.addQuestion(this.quizId, data).subscribe(
      data => this.questions.push(data)
    );
  }

  submitQuizAnswers(data) {
    console.log(this.model);
  }
}

