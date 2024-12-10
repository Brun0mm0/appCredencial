import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-recover-dni',
  templateUrl: './recover-dni.component.html',
  styleUrls: ['./recover-dni.component.css']
})
export class RecoverDniComponent implements OnInit {

  formularioRecover: FormGroup = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern('[0-9. ]{3,12}')]],
  })

  campoNoEsValido(campo:string) {
    return this.formularioRecover.controls[campo].errors && this.formularioRecover.controls[campo].touched;
  }

  constructor( private fb:FormBuilder,
               private auth:AuthService ) { }

  ngOnInit(): void {
    this.formularioRecover.statusChanges
    .subscribe( data => {
      if( data == 'VALID') {
        this.auth.setValid(true);
        this.auth.dniRecover.dni = this.formularioRecover.get('dni')?.value
      }
    })
  }

}
