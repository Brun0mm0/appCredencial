import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {


  private habilitado$ : Subscription = new Subscription
  private spinner$ : Subscription = new Subscription


  habilitado! : boolean
  spinner!: boolean
  // prueba = true

  @Input() nombre = ''

  constructor( private auth:AuthService) {
    this.habilitado = false
    this.spinner = false
  }
  ngOnInit() {
    this.habilitado$ = this.auth.valid$
    .subscribe(
      data => this.habilitado = data
    )
    this.spinner$ = this.auth.spinner$
    .subscribe(
      data =>{ console.log(data),
        this.spinner = data 
        this.habilitado = !this.habilitado
        }
    )
  }


}
