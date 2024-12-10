import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data/data-base.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  @Input() data : any; 
  direccion : any;
  constructor( private service:DataBaseService ) { }

  ngOnInit(): void {
    // this.service.getDireccion(this.data.id_direccion)
    // .subscribe( data => {
      // console.log(this.data)
    //   this.direccion = data.data
    // }
    // )
  }

}
