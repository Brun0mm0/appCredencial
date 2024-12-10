import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  imagen : string = './assets/img/undraw_access_account_re_8spm.svg'

  public subscriber!: Subscription;

  constructor( ) { }

  ngOnInit(): void {
  }

}
