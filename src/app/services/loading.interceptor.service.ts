import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
    private countRequest = 0;
    private idMessage: string = '';
    constructor(private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.countRequest++;
        this.spinner.show();
        return next.handle(request)
            .pipe(
                finalize(() => {
                    this.countRequest--;
                    if (!this.countRequest) {
                        this.spinner.hide();
                    }
                })
            );
    }
}
