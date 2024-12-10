import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, throwError } from "rxjs";
import { Auth, AuthGetAfiliado, Credencial, Usuario } from "src/app/interface/afiliado.interface";
import { DataBaseService } from "src/app/data/data-base.service";
import { Data } from "../interface/region.interface";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { UsuarioModel } from "./models/UsuarioModel.model";


@Injectable()
export class AuthService {

  // Propiedad Usuario, lo usamos de modelo para grabar base de datos
  usuario:UsuarioModel = new UsuarioModel(this.dataBaseService);


  dniRecover : any = {dni: ''};
  passRecover : any = {token:'',
                       pass:''};

  private res = new Subject<Credencial>()
  res$ = this.res.asObservable()
  
  private spinner = new Subject<boolean>()
  spinner$ = this.spinner.asObservable()
  // Obresvable para el boton 'siguiente' en el signin component  
  private valid = new Subject<boolean>();
  valid$ = this.valid.asObservable();    
  
  // Observable para consultar estado en el signin component
  private estado = new Subject<string>();
  estado$ = this.estado.asObservable();
  
  private dni = new Subject<String>()
  _dni = this.dni.asObservable() 

  constructor( private http:HttpClient,
               private dataBaseService:DataBaseService,
               private route:Router ){}

    getLocalidad(cp : number) : Observable<Data> {
        return this.http.post<any>('v1.2/localidades',{cp:cp})}
    
    getAfiliado( dni :  AuthGetAfiliado ) : Observable<any> {
      return this.dataBaseService.getEstadoAfiliado(dni).pipe(
        catchError(this.handleError)
      )
    }

    setValid(valid:boolean){
      this.valid.next(valid);
    }

    setSpinner(spinner:boolean){
      this.spinner.next(spinner)
    }

    setEstado(estado:string){
      this.estado.next(estado);
    }

    setDni(){
      this.dni.next(this.usuario.documento)
    }

    reiniciarUsuario(){
      this.usuario = new UsuarioModel(this.dataBaseService,'','','','','','','','','','','','')
    }

      grabarUsuario(){
      this.dataBaseService.postUsuario(this.usuario)
      .subscribe(
         async data => {
           if(data.status == 'success')
           await Swal.fire({
             title:'Gracias por registrarse', 
             text: 'Ingrese a su credencial haciendo click en el link que enviamos a su mail', 
             icon:'success',
             buttonsStyling: false,
             customClass: {
               confirmButton : 'btn btn-outline'
              }})
        this.setSpinner(false)
        this.route.navigateByUrl('/auth/login')
        this.reiniciarUsuario()
    }
    )
    }

    confirm(id:any) {
      this.dataBaseService.confirmarUsuario(id)
      .subscribe( async data => {
        await Swal.fire({
          title:'Felicitaciones, terminamos de registrarte a la credencial digital', 
          text: 'Ya puede ingresar a su credencial digital', 
          icon:'success',
          confirmButtonText:'Ingresar',
          buttonsStyling: false,
          customClass: {
            confirmButton : 'btn btn-outline'

           }
        })
        if(data.status == 'success') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          localStorage.setItem('loc', data.loc);
          this.route.navigate(['/portal/credencial/'])
        }
      })
    }

    logIn(usuario:Auth){
      this.dataBaseService.logIn(usuario);
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
      console.log(error.error)
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

}