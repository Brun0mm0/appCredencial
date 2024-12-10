import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data/data-base.service';
import { Data } from 'src/app/interface/afiliado.interface';
import { PortalService } from '../../portal.service';

@Component({
  selector: 'app-s300',
  templateUrl: './s300.component.html',
  styleUrls: ['./s300.component.css']
})
export class S300Component implements OnInit {

  @Input() afiliado! : Data;

  constructor( private service : PortalService ) { 
  }
  
  ngOnInit(): void {
  }

  descargar(){
    // this.service.descargaCredencial()
  }

}




