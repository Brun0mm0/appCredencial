import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  private spinner : Subscription = new Subscription

  spinner$! : boolean;
  _url! : any

  constructor( private url:ActivatedRoute,
               private auth:AuthService  ) {
                 this.spinner$ = true;
                //  this._url = ''
                }

  ngOnInit(): void {
    this.auth.valid$.subscribe(
      valid => this.spinner$ = valid
    )
    this.url.params
    .subscribe( data => this._url = data)
    this.auth.confirm(this._url)
  }

}
