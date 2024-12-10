import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataBaseService } from 'src/app/data/data-base.service';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {

  cartillaRes : any[] = [];
  region : any[] = [];
  zona : any[] = [];
  atencion : any[] = [];
  especialidad : any[] = [];
  formulario : boolean;
  atencionBc:string=''
  zonaBc:string=''
  especialidadBc:string=''


  cartilla : UntypedFormGroup = this.fb.group({
    region:['',[Validators.required]],
    zona:['',[Validators.required]],
    atencion:['',[Validators.required]],
    especialidad:['',[Validators.required]],
    plan:['']
  })

  constructor( private db:DataBaseService,
               private fb:UntypedFormBuilder,
               private route:ActivatedRoute,
               private router:Router,
               private auth:AuthService,
               ) {
                this.formulario = true;
                }

ngOnInit(): void {
// TODO: obtener plan del url y setearlo en formulario
  this.route.params
    .subscribe(data=>{
      this.cartilla.get('plan')?.setValue(data['plan']);
        this.db.getRegion()
        .subscribe( data => {
          this.region = data.data
      })
    })

// TODO: obtener datos para select region

// TODO: obtener datos para select zona
this.cartilla.get('region')?.valueChanges
.subscribe(data => {
      this.consola(data)
      console.log(data)
      this.db.getZona(data)
      .subscribe(zona => {
        this.zona = zona.data;
        this.especialidad = [];
        this.db.getAtencion()
          .subscribe(data=>{
            this.atencion = data.data})
      })
    })

// TODO: obtener datos para select atencion

// TODO: obtener datos para select especialidad
  this.cartilla.get('atencion')?.valueChanges
  .subscribe( esp => {
    const zona = this.getZona()
    this.route.params
    .subscribe(data => {
      const plan = data['plan']
      this.db.getEspecilidad(plan,esp,zona)
      .subscribe( especialidades => this.especialidad = especialidades.data)
    })
  })

// TODO: si el formulario es valido se habilita el boton
this.cartilla.get('atencion')?.valueChanges
.subscribe(data=>{
  if(data == 9) {
    this.cartilla.get('especialidad')?.setValue(97)
  } else if(data == 10) {
    this.cartilla.get('especialidad')?.setValue(98)
  }
})

  this.cartilla.statusChanges
    .subscribe(estado => {
      console.log(estado)
      if(estado == 'VALID') {
        this.auth.setValid(true)
      } else {
        this.auth.setValid(false)
      }
    })
  }

mostrar(){
    if(this.cartilla.valid){
      this.bcSeter();
      console.log(this.cartilla.value)
      this.db.getCartilla(this.cartilla.value)
      .subscribe(data => {
     
        let dataMap = data.data.map( (obj: any) => {
          return [JSON.stringify(obj),obj]
        })
        let dataMapArr = new Map(dataMap)
        let res = [...dataMapArr.values()]

        if(res.length == 0) {
          this.cartillaRes = ['sin resultado']
        } else {
          this.cartillaRes = res}
        }
        )
      this.formulario = false
    }
  }

breadcrumb() {
  this.formulario = true
}

volver(){
    this.router.navigateByUrl(`portal/credencial/${localStorage.getItem('id')}`)
  }

getZona(){
  return this.cartilla.get('zona')?.value
}

bcSeter() {
  this.zonaBc = this.zona.find(atencion =>
     atencion.id  == this.cartilla.get('zona')?.value)['provincia'];
  this.atencionBc = this.atencion.find(atencion =>
     atencion.id_atencion  == this.cartilla.get('atencion')?.value)['atencion'];
  this.especialidadBc = this.especialidad.find(esp =>
     esp.id_especialidad  == this.cartilla.get('especialidad')?.value)['especialidad'];
  console.log(this.atencion.find(at => at.id_atencion == 2), this.atencion)
}  

consola(data:any) {
  console.log(data)
}
}
