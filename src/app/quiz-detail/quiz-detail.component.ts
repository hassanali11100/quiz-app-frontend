import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  currentQuiz: Quiz;
  isDataAvailable:boolean = false
  @Input() quizId: number;

  constructor(private quizService: QuizService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getQuizDetail(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(
      (data) => {
        this.currentQuiz = data;
        this.isDataAvailable = true;
      }
    )
  }

  getQuizDetail(id: number): Observable<Quiz> {
    return this.quizService.getQuiz(id);
  }

}
