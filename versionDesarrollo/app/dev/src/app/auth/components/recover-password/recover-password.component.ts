import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  formPass : UntypedFormGroup = this.fb.group({
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]],
  })

  token = ''

  campoNoEsValido(campo:string) {
    return this.formPass.controls[campo].errors && this.formPass.controls[campo].touched && this.formPass.controls[campo].pristine;
  }
  errorPass(campo:string) {
    return this.formPass.get(campo)?.hasError('minlength') && this.formPass.controls[campo].touched;
  }
  errorPass2(campo:string) {
    return this.formPass.get(campo)?.hasError('noIguales') && this.formPass.controls[campo].touched;
  }

  constructor( private fb:UntypedFormBuilder,
               private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.setValid(false)
    this.formPass.statusChanges
    .subscribe( data => {
      if(data == 'VALID') {
        this.auth.setValid(true);
        this.auth.passRecover.pass = this.formPass.get('password')?.value
      }
    }
    )
  }

}
