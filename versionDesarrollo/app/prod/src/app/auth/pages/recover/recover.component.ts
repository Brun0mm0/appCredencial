import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { DataBaseService } from '../../../data/data-base.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent {
  btn:string="enviar";
 
  token:boolean = false

  valid = false

  constructor( private auth:AuthService, 
               private route:Router,
               private user:DataBaseService,
               private _url:ActivatedRoute) { }

  ngOnInit() : void {
    this.auth.setValid(false);
    this.auth.valid$.subscribe(data=>this.valid = data)
    this._url.params.subscribe( url => { if(url['token']=='null')
    {this.token = true}
    else {
      this.auth.passRecover.token = url['token']
    }
  })
              }

  submit() {
    if(this.valid) {
      this.btn = 'Espere ...'
      this.auth.setSpinner(true)
      this.auth.setValid(false);
    if(this.token) {
      this.user.recoverDni(this.auth.dniRecover)
      .subscribe( async (data: { email: any; }) => {
        
       await Swal.fire({
        title:'Atencion', 
        text: `Enviamos un mail a ${data.email} con un link para que puedas recuperar tu contraseña`, 
        icon:'success',
        buttonsStyling: false,
        customClass: {
          confirmButton : 'btn btn-outline'
        }})
        this.auth.dniRecover.dni = ''
        this.route.navigateByUrl('./auth')
      })
    } else {
      this.user.recoverPass(this.auth.passRecover)
      .subscribe( async data => {

        await Swal.fire({
          title:'Listo', 
          text: `Ya actualizamos tu contraseña`, 
          icon:'success',
          buttonsStyling: false,
          customClass: {
            confirmButton : 'btn btn-outline'
          }})
          this.auth.passRecover.token = ''
          this.auth.passRecover.pass = ''
          this.route.navigateByUrl('./auth')
      }
      )
}
}
}
}
