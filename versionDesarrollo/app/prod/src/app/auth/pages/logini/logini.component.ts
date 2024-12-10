import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-logini',
  templateUrl: './logini.component.html',
  styleUrls: ['./logini.component.css']
})
export class LoginiComponent implements OnInit {

  items!: MenuItem[];

  
  btn : string = 'ingresar'
  habilitado! : boolean;
  _url! : string | null;
  
  formularioLogin: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, ]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  
  // funcion que comprueba error en el campo, si no es valido retorna false
  campoNoEsValido(campo:string) {
    return this.formularioLogin.controls[campo].errors && this.formularioLogin.controls[campo].touched;
  }
  
  constructor( private fb : FormBuilder, 
               private auth: AuthService, ) { }

    ngOnInit() {

      this.formularioLogin.statusChanges
      .subscribe( data => {
        if(data == 'VALID') {
          this.auth.setValid(true)
        } else {
          this.auth.setValid(false)
        }
      })
  }
  
  submit(){
    if(this.formularioLogin.valid){
      this.auth.logIn(this.formularioLogin.value)
    }
  }
}
