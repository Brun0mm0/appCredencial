import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/data/data-base.service';
import { ValidatorService } from 'src/app/validator/validator.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css']
})

export class DniComponent implements OnInit, OnDestroy{

  spinner : boolean = false

  formDni : FormGroup = this.fb.group({
    tipo:['',[Validators.required]],
    numero:['',{
      validators: [Validators.required, Validators.pattern('[0-9. ]{3,12}')],
      asyncValidators: [this.validator.dniValidator(this.data)]
    }]
  })

  campoNoEsValido(campo:string) {
    return this.formDni.controls[campo].errors && this.formDni.controls[campo].touched && this.formDni.controls[campo].pristine;
  }
  campoNoEsValidoPattern(campo:string) {
    return this.formDni.controls[campo]?.hasError('pattern') && this.formDni.controls[campo].touched;
  }
  numeroErrors(){
    const error = this.numeroControl?.errors 
    return error ? true : false 
  }
  numeroValid(){
    return this.numeroControl.valid
  }

  constructor( private fb:FormBuilder,
               private auth:AuthService,
               private validator:ValidatorService,
               private data:DataBaseService ) { }
    
    

  ngOnInit(): void {
    this.auth.reiniciarUsuario()

    if(this.auth.usuario.documento !== '') {
      this.tipoControl.setValue(this.auth.usuario.tipoDocumento),
      this.numeroControl.setValue(this.auth.usuario.documento)
    } 
    // Al inicio consulto en el modelo de usuario si hay datos en authService y los seteo en los campos
    // Se emite un evento al pasar el formulario a estado valido
    this.formDni.statusChanges
      .subscribe( data => {
        if( data == 'VALID'){
          this.spinner = false
          this.auth.usuario.setDocumento(this.numeroControl!.value)
          this.auth.usuario.setTipoDocumento(this.tipoControl!.value)
          this.auth.getAfiliado(this.formDni.value)
          .subscribe({
            next: res => {
              console.log(res)
              this.auth.usuario.setNombre(res.data.nombre);
              this.auth.usuario.setApellido(res.data.apellido);
            },
            error: err => {
              console.log('err');
            },
            complete: () => {
              // Puedes manejar la finalización del observable aquí si es necesario
              console.log('Request complete');
            }
          })
        } else {
          this.formDni.markAllAsTouched()
          this.spinner = false
        }
      }
      )

}
  ngOnDestroy(): void {
  }
get tipoControl() {
  return this.formDni.controls['tipo']
}
get numeroControl() {
  return this.formDni.controls['numero']
}
}

