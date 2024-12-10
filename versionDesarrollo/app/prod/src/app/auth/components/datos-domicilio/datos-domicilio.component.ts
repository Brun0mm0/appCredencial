import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Localidad, Data } from 'src/app/interface/region.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-datos-domicilio',
  templateUrl: './datos-domicilio.component.html',
  styleUrls: ['./datos-domicilio.component.css']
})


export class DatosDomicilioComponent implements OnInit, OnDestroy {

  btn : string = 'Enviar';
  estadoBtn! : boolean;
  spinner! : boolean;
  Localidades:Localidad[]=[];

  localidad : FormGroup = this.fb.group({
    cp: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    localidad: ['',[Validators.required]],
    provincia: ['',[Validators.required]],
    direccion: ['',[Validators.required]],
  })


  campoNoEsValido(campo:string) {
    return this.localidad.controls[campo].errors && this.localidad.controls[campo].touched;
  }

  constructor( private auth : AuthService,
               private fb : FormBuilder ) {}
    
  ngOnInit(): void {
    
    this.localidad.get('cp')?.statusChanges
    .subscribe(data=>{
      if(data=='VALID'){
        this.spinner = true
        if(this.localidad.get('cp')?.valid){
          let cp = this.localidad.get('cp')?.value
            this.auth.getLocalidad(cp)
            .subscribe(data => this.Localidades = data.data)
        }
        this.load()
      }
    }
    )

    this.localidad.get('localidad')?.statusChanges
    .subscribe(estado=>{
      let localidadId = this.localidad.get('localidad')?.value;
      let provincia = this.Localidades.findIndex(localidad => localidad.loc_id == localidadId)
      this.localidad.get('provincia')?.reset(this.Localidades[provincia].pro_cod)
    })

    this.localidad.statusChanges
    .subscribe(estado => {
      console.log(estado)
      if(estado == 'VALID'){
        this.auth.usuario.codigoPostal = this.localidad.get('cp')?.value
        this.auth.usuario.localidad = this.localidad.get('localidad')?.value
        this.auth.usuario.provincia = this.localidad.get('provincia')?.value
        this.auth.usuario.direccion = this.localidad.get('direccion')?.value
        if(!this.estadoBtn) {
          this.auth.setValid(true)
      }}
      else { this.auth.setValid(false)}
    })

  };
  
  enviarCP(){
    if(this.localidad.get('cp')?.valid){
      let cp = this.localidad.get('cp')?.value
        this.auth.getLocalidad(cp)
        .subscribe(data => this.Localidades = data.data)
    }
    
  }

  ngOnDestroy(): void {
  }
  load():void {
    setTimeout(()=>this.spinner = false, 3000);
  }
}
