import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data/data-base.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() cartilla! : any[];

  constructor(private service:DataBaseService) { }

  ngOnInit(): void {
   
  }
}
