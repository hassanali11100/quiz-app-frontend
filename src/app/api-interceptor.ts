import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // TODO: fix this via env-var, heroku doesn't pick env variable by mention --prod flag
        const temp_env_var_baseUrl: string = 'https://anyquizapi.herokuapp.com/';
        const apiReq = req.clone({ url: `${environment.baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
}