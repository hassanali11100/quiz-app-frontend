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

@NgModule({
  declarations: [
    AppComponent
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
    AngularFontAwesomeModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
