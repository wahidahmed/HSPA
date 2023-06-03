import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, concatMap, of, retryWhen, throwError } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { ErrorCode } from '../enums/enum';

@Injectable({
  providedIn:'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertify:AlertifyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('interceptor is called')
    return next.handle(request).pipe(
      retryWhen(e=>
        this.retryRequest(e,10)
       ),
      catchError((e:HttpErrorResponse)=>{
        console.log(e)
        const errorMessage=this.setError(e);
        this.alertify.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  retryRequest(error:Observable<unknown>,retryCount:number):Observable<unknown>{
    return error.pipe((
      concatMap((checkError:HttpErrorResponse,count:number)=>{
        if(checkError.status==ErrorCode.serverDown && count<retryCount){
          return of(checkError)
        }

        // if(checkError.status==ErrorCode.unauthorized && count<retryCount){
        //   return of(checkError)
        // }
        return throwError(checkError);
      })
    ))
  }
  setError(e:HttpErrorResponse):string{
    let errorMessage='Unknown error';
    if(e.error instanceof ErrorEvent){
      // client side error
      errorMessage=e.error.message;
    }
    else{
      if(e.status==401){
        return e.statusText;
      }
      //server side error
      if(e.error.errorMessage && e.status!=0){
        errorMessage=e.error.errorMessage;
      }

    }
    return errorMessage;
  }
}
