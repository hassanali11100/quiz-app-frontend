import { Component, OnInit } from '@angular/core';
import { Observable, observable, zip } from 'rxjs';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';
import { ChoiceService } from '../choice.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizId: number;
  questions: Question[];
  isDisplayQuestionForm: boolean = false;

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    private choiceService: ChoiceService) { 
    this.quizId = parseInt(this.route.snapshot.paramMap.get('quiz_id'));
  }

  ngOnInit() {
    // this.getQuestions(this.quizId).subscribe(
    //   data => this.questions = data
    // )
  }

  // getQuestions(quizId: number): Observable<Question[]> {
  //   return this.questionService.getQuestions(quizId);
  // }

  toggleDisplayForm() {
    this.isDisplayQuestionForm = !this.isDisplayQuestionForm;
  }

  addQuestion(questionWithChoices) {
    console.log(questionWithChoices);
    return this.questionService.addQuestion(this.quizId, {text: questionWithChoices.text}).subscribe(
      (data) => {
        this.questions.push(data);
        let allChoices = [];
        // Because all the choices are hardcoded
        allChoices.push(questionWithChoices.choice1);
        allChoices.push(questionWithChoices.choice2);
        allChoices.push(questionWithChoices.choice3);
        allChoices.push(questionWithChoices.choice4);
        allChoices = allChoices.filter(value => Object.keys(value).length !== 0);
        const choiceObservables = allChoices.map((choice) => {
          return this.choiceService.addChoice(this.quizId, data.id, {text: choice.text, "is_correct?": Boolean(choice['is_correct?']) })
        })

        const choices = zip(...choiceObservables);

        choices.subscribe(
          (data) => console.log(data)
        )
      }
    );
  }
}

