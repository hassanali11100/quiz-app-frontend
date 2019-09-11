import { Component, OnInit } from '@angular/core';
import { Quiz } from './quiz-data';
import { DataService } from './data.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  fetchId: number;
  quizFormGroup: FormGroup;
  
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

  createQuiz() {
    this.dataService.addQuiz(this.quizFormGroup.value).subscribe(data => {
      this.quiz = data;
      console.log(this.quiz);
    })
    this.getQuizzes();
  }

  deleteQuiz(id: number) {
    this.dataService.deleteQuiz(id).subscribe(data => {
      this.quiz = data;
      console.log(this.quiz);
    })
    this.getQuizzes();
  }

  ngOnInit() {
    this.quizFormGroup = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    })
    this.getQuizzes();
  }
}
