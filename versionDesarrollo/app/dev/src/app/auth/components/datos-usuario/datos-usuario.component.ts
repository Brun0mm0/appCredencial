import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/data/data-base.service';
import { ValidatorService } from 'src/app/validator/validator.service';
import { AuthService } from '../../auth.service';
import { delay, tap } from 'rxjs'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  btn : string = 'Crear';

  formUsuario : UntypedFormGroup = this.fb.group({
    usuario: ['',{
      validators:[Validators.required],
      asyncValidators:[this.validatorService.usuarioValidator(this.data)]
    }],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]],
  },{
    validators: [ this.validatorService.camposIguales('password','password2')]
  })

  campoNoEsValido(campo:string) {
    return this.formUsuario.controls[campo].errors && this.formUsuario.controls[campo].touched && this.formUsuario.controls[campo].pristine;
  }
  errorPass(campo:string) {
    return this.formUsuario.get(campo)?.hasError('minlength') && this.formUsuario.controls[campo].touched;
  }
  errorPass2(campo:string) {
    return this.formUsuario.get(campo)?.hasError('noIguales') && this.formUsuario.controls[campo].touched;
  }
  errorUsuario() {
    return this.usuario.hasError('usuarioExists')
  }


  constructor( private fb:UntypedFormBuilder,
               private auth:AuthService,
               private validatorService:ValidatorService,
               private route:Router,
               private data:DataBaseService ) { }

  ngOnInit(): void {
    this.formUsuario.statusChanges
    .subscribe(
      data => {
        if(data == 'VALID') {
          this.auth.setValid(true);
          this.auth.usuario.setUsuario(this.formUsuario.get('usuario')?.value)
          this.auth.usuario.setPassword(this.formUsuario.get('password')?.value)
          console.log(this.auth.usuario)
        } else {
          this.auth.setValid(false);
        }
      }
    )
  }
  grabar(){
    if(this.formUsuario.valid) {
      console.log(this.auth.usuario)      
      this.auth.setSpinner(true)
      delay(1500)
      // this.auth.setSpinner(false)
      this.auth.usuario.insertUsuario()
    //   .pipe(
    //     tap(()=>{
    //     }
    //     )
    //   )
      .subscribe( async data =>{
    //     console.log(data)
        if(data.status = 'success') {
          await Swal.fire({
            title:'Gracias por registrarse', 
            text: 'Ingrese a su credencial haciendo click en el link que enviamos a su mail', 
            icon:'success',
            buttonsStyling: false,
            customClass: {
              confirmButton : 'btn btn-outline'
             }})
          this.auth.setSpinner(false)
          this.route.navigate(['/auth/login/'])
          this.auth.reiniciarUsuario()
        } 
      }
        )
    }
    return
  }
  get usuario(){
    return this.formUsuario.controls['usuario']
  }

}
