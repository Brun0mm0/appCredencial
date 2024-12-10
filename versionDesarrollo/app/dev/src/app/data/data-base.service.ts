import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credencial, resAuth } from '../interface/afiliado.interface';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor( private http : HttpClient,
               private router : Router ) { }

  private url:string = '/v1.2';

  logIn( auth : any ) :  any {
    this.http.post< resAuth >(`${this.url}/auth`, auth)
    .subscribe( res => {
      console.log(res)
      if(res.status == 'success') {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.id);
        localStorage.setItem('loc', res.loc);
        this.router.navigate(['/portal'])
      }
    })
  }
  getId( id : any) : Observable< Credencial >{
    return this.http.post< Credencial >(`${this.url}/init`, id);
  }
  credencialId( id : any) : Observable< Credencial >{
    return this.http.post< Credencial >(`${this.url}/credencial`, id);
  }
  getEstadoAfiliado( solicitud : any) : Observable<any>{
    return this.http.post<any>(`${this.url}/init`, solicitud).pipe(
      catchError(this.handleError)
    );
  }
  postUsuario( afiliado : any ) : Observable<Credencial> {
    return this.http.post<Credencial>(`${this.url}/usuario`, afiliado);
  }
  getUsuario(usuario:any):Observable<any>{
    return this.http.post(`${this.url}/exists`, { usuario:usuario })
  }
  putRecover( recover : any ) : Observable<any>{
    return this.http.put(`${this.url}/auth`, recover)
  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${this.url}log`, {
      headers: {
        'Authorization': `Bearer ${token}`  
      }
    }).pipe( 
      map( resp=>true ),
      catchError( async (error) => false)
    );
  }
  confirmarUsuario(id:any) {
    return this.http.post<any>(`${this.url}/confirm`,id)
  }
  recoverDni(dni:any):Observable<any>{
   return this.http.post(`${this.url}/recover`, dni)
  }
  recoverPass(pass:any):Observable<any>{
    return this.http.post<any>(`${this.url}/recoverConfirm`, pass)
  }
  credencialPdf( id : any ):Observable<any>{
    const token = localStorage.getItem('token')||'';
    let header = new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Accept': 'application/pdf'})

    return this.http.post(`${this.url}/credencialPdf`, {dni: id}, {headers:header, responseType: 'blob'})

}
  getRegion():Observable<any>{
    return this.http.get(`${this.url}/cartilla`)
  }
  getZona(region:string):Observable<any>{
    return this.http.get(`${this.url}/cartilla?reg=${region}`)
  }
  getAtencion():Observable<any>{
    return this.http.get(`${this.url}/cartilla?atencion=true`)
  }
  getEspecilidad(plan:any,ate:any,zona:any):Observable<any>{
    
    return this.http.get(`${this.url}/cartilla?plan=${plan}&zona=${zona}&especialidad=${ate}`)
  }
  getCartilla(data:any):Observable<any>{
    return this.http.post(`${this.url}/cartilla/cartilla`,data)
  }
  getDireccion(data:any):Observable<any>{
    return this.http.post(`${this.url}/cartilla/direccion`,{id:data})
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    // console.log(error)
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `${error.error.message}`;
    }
    // console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
 