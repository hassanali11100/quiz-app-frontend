import { Component, OnInit, Input } from '@angular/core';
import { ChoiceService } from '../choice.service';
import { Choice } from '../choice';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit{
  @Input() quizId: number;
  @Input() questionId: number;
  @Input() model: object;
  choices: Choice[];
  message: string;
  tempVar: number = 2;

  constructor(private choiceService: ChoiceService) { }

  ngOnInit() {
    this.getChoices();
  }

  getChoices() {
    this.choiceService.getChoices(this.quizId, this.questionId).subscribe(
      (data) => this.choices = data
    );
  }
}
