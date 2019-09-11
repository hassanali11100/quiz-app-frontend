import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Quiz } from './quiz-data';

export class QuizData implements InMemoryDbService {
    createDb() {
        const quizzes: Quiz[] = [
            {id: 1, title: 'ImranKhanBiography', description: 'contains Biography of imran khan'},
            {id: 1, title: 'JinnahBiography', description: 'contains Biography of Muhammad Ali Jinnah'}
        ];

        return {quizzes};
    }
}