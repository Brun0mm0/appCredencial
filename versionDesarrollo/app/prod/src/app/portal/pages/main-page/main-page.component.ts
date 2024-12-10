import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataBaseService } from 'src/app/data/data-base.service';
import { Data } from 'src/app/interface/afiliado.interface';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  afiliado! : Data;
  s300jclass! : boolean;
  s300eclass!: boolean;
  clase : string = ''
  img : string = '';
  img_fondo : string = '';

  constructor(private data:DataBaseService,
              private route:Router ) {}

  ngOnInit(): void {
    // this.route.navigate([`portal/cartilla/s200`])
    this.data.credencialId({ben_id:localStorage.getItem('id')})
    .subscribe( data => {
       if(data.data.Plan == 'S300J') {this.s300jclass = true} 
        else if (data.data.Plan == 'S300E') {this.s300eclass = true}
        else {this.s300eclass = false; this.s300jclass = false}
    })
    this.route.navigate([`portal/credencial/${localStorage.getItem('id')}`])
    this.route.events
    .subscribe( (event:any) => {
      if(event instanceof NavigationEnd)
      { if(event.url.includes('cartilla'))
        {this.s300jclass = false;
         this.s300eclass = false}
        else if (event.url.includes('credencial'))
        this.data.credencialId({ben_id:localStorage.getItem('id')})
        .subscribe( data => {
          if(data.data.Plan == 'S300J') {this.s300jclass = true} 
          else if (data.data.Plan == 'S300E') {this.s300eclass = true}
          else {this.s300eclass = false; this.s300jclass = false}
          this.route.navigate([`portal/credencial/${localStorage.getItem('id')}`])
        }) } 
    })
  }

  submit(){
    return
  }

}
