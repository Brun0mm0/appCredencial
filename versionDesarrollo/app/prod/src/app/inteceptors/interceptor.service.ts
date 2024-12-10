import { HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor( private route : Router ) { }

  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    if(req.url.includes('credencial') || req.url.includes('cartilla')){
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`  
      })
      const reqClone = req.clone({headers:headers})

      return next.handle(reqClone)
      .pipe(
        catchError( 
          this.mensajeError
      ))
    } else {
      return next.handle(req)
      .pipe(
        catchError( 
          this.mensajeError
      ))
    }
  }
  async mensajeError(err:HttpErrorResponse){
    if (err.status === 521) {
      // Ignorar el error 521 y no hacer nada
      return; // O puedes retornar un observable vacío si es necesario
    } else if(err.status == 401 ){
      await Swal.fire({
      title:'Error', 
      text:err.error.msg, 
      icon:'error',
      buttonsStyling: false,
      customClass: {
        confirmButton : 'btn btn-outline'
      }
      })
     } else if (err.status == 404 ){
        await Swal.fire({
        title:'Error', 
        text:err.error.msg, 
        icon:'error',
        buttonsStyling: false,
        customClass: {
          confirmButton : 'btn btn-outline'
      }
    });
      this.route.navigate(['#/auth']);
    } else if(Math.round(err.status/100) == 5) {
      
      await Swal.fire({
        title:'Error', 
        text:'Error de servidor, intente nuevamente mas tarde', 
        icon:'error',
        buttonsStyling: false,
        customClass: {
          confirmButton : 'btn btn-outline'
        }
      });
      this.route.navigateByUrl('/auth/login');
    }}
}
