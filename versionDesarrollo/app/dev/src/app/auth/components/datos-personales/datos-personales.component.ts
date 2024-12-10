import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validator/validator.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})


export class DatosPersonalesComponent implements OnInit, OnDestroy {
  
  formPersonales : UntypedFormGroup = this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    email:['',[Validators.required, Validators.pattern(this.validators.emailPattern)]],
    telefono:['',[Validators.required]],
  })

  campoNoEsValido(campo:string) {
    return this.formPersonales.controls[campo].errors && this.formPersonales.controls[campo].touched && this.formPersonales.controls[campo].pristine;
  }
  campoNoEsValidoPattern(campo:string) {
    return this.formPersonales.controls[campo]?.hasError('pattern') && this.formPersonales.controls[campo].touched;
  }

  constructor( private fb:UntypedFormBuilder,
               private auth : AuthService,
               private validators : ValidatorService ) { }

  ngOnInit(): void {
    // console.log(this.auth.usuario.getUsuario().nombre)
    this.formPersonales.get('nombre')?.setValue(this.auth.usuario.getUsuario().nombre)
    this.formPersonales.get('apellido')?.setValue(this.auth.usuario.getUsuario().apellido)

    this.formPersonales.statusChanges
    .subscribe( data=> {
      if( data == 'VALID'){
          this.auth.usuario.setEmail(this.email?.value);
          this.auth.usuario.setTelefono(this.telefono?.value);
      }
    })  
  }
  ngOnDestroy(): void {
  }
  get email() {
    return this.formPersonales.get('email')
  }
  get telefono() {
    return this.formPersonales.get('telefono')
  }
}
