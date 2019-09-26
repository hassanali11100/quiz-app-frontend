import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { QuizData } from './quiz-data.service';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { environment } from 'src/environments/environment';

import { ApiInterceptor } from './api-interceptor';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { RouterModule, Route, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { ChoiceComponent } from './choice/choice.component';
import { QuizComponent } from './quiz/quiz.component';


const appRoutes: Routes = [
  { path: 'quizzes/:quiz_id/questions', component: QuestionComponent, pathMatch: 'full' },
  { path: 'quizzes/:quiz_id/startQuiz', component: QuizComponent, pathMatch: 'full' },
  { path: 'quizzes/:id', component: QuizDetailComponent,
    // children: [
    //   { path: 'questions', component: QuestionComponent }
    // ] 
  },
  { path: 'quizzes', component: QuizListComponent },
  { path: '', redirectTo: '/quizzes', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizDetailComponent,
    QuestionComponent,
    ChoiceComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // !environment.production ?
    // InMemoryWebApiModule.forRoot(QuizData, { delay: 100 }) : [],
    // InMemoryWebApiModule.forRoot(QuizData),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
