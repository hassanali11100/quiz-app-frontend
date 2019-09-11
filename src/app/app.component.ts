import { Component, OnInit } from '@angular/core';
import { Quiz } from './quiz-data';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quiz-app-frontend';
  quizzes: Quiz[] = [];
  quiz: Quiz;
  displayData: boolean = false;
  fetchId: number = 0;
  
  constructor(private dataService: DataService) {}

  getQuizzes() {
    this.dataService.getQuizzes().subscribe((data: Quiz[]) => {
      this.quizzes = data;
    })
  }

  getQuiz() {
    this.dataService.getQuiz(this.fetchId).subscribe((data: Quiz) => {
      this.quiz = data;
      this.displayData = true;
    })
  }
  ngOnInit() {
    this.getQuizzes();
  }
}
