import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../portal.service';
import { Data } from 'src/app/interface/afiliado.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseService } from 'src/app/data/data-base.service';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

 clase : string = ''
 afiliado! : Data
 img : string = '';
 img_fondo : string = '';
 cliente : any = this.validCartilla()
 loc : any = localStorage.getItem('loc')
  constructor( private service:PortalService,
               private router:Router,
               private route: ActivatedRoute,
               private data: DataBaseService) {
  }
  descargar(){
    this.service.descargaCredencial()
  }
  ngOnInit(): void {
    this.route.params
    .subscribe( params => {
      console.log(params)
      this.data.credencialId(params)
      .subscribe( data => {
        if (data.data.Plan == 'S300J' || data.data.Plan == 'S300E') {
          this.clase = 's300-credencial'
          this.img = `./assets/img/${data.data.Plan}.png`
          this.img_fondo = './assets/img/bancariosNegativo.png'
        } else {
          this.clase = 'credencial';
          this.img = './assets/img/tarjeta-de-identificacion.png'
        } 
        this.afiliado = data.data})
    })
  }
  cartilla(){
    this.router.navigateByUrl(`/portal/cartilla/${this.afiliado.Plan}`)
    this.clase = 'credencial'
  }
  mostrar(){
    console.log('mostrar')
    this.service._datos
    .subscribe( data => console.log('credencial',data))
  }
  validCartilla(){
    if(this.afiliado?.Plan == 'S300J' || this.afiliado?.Plan == 'S300E') {
      return false
    } else {
      return true
    }
  }
}
