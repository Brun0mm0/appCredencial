import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataBaseService } from '../data/data-base.service';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})

export class PortalService {



  datos = new Subject<any>()
  _datos = this.datos.asObservable()

  constructor( private data:DataBaseService ) { }

 
  
  descargaCredencial(){
    this.data.credencialPdf(localStorage.getItem('id'))
    .subscribe(res => {
      let blob = new Blob([res],{type:'application/pdf'});
      saveAs(blob, "Credencial.pdf")
    })
  }
}
