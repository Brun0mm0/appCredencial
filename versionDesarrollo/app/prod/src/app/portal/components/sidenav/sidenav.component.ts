import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ExampleFlatNode, Familia, FamiliaNode, Links } from 'src/app/interface/afiliado.interface';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  

  // @Input() familia! : Familia[];

  private TREE_DATA: Links[] = [
    {
      name: 'Links de interes',
      url:'',
      children: [
        {name: 'Osssb', url:'http://www.osssb.com'}, 
        {name: 'POBA', url:'https://www.policlinicabancaria.com.ar/'},
        // {name: 'Portal Paciente', url:"https://policlinicabancaria.axonico.ar/login.php?red=NTk="}
      ],
    },
    
  ];

  // private TREE_FAMILIA: Familia[] = [
  //   {
  //     nombre: 'Familiares',
  //     dni: '',
  //     children: this.familia
  //   }
  // ]

  private _transformer = (node: Links, level: number) => {
    return {
      expandable: !!node.children && node.children.length  > 0,
      name: node.name,
      level: level,
      url: node.url,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  // private _transformerFamilia = (node: Familia, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length  > 0,
  //     nombre: node.nombre,
  //     level: level,
  //     dni: node.dni
  //   };
  // };



  // familiaControl = new FlatTreeControl<FamiliaNode>(
  //   node => node.level,
  //   node => node.expandable
  // );
  // familiaFlattener = new MatTreeFlattener(
  //   this._transformerFamilia,
  //   node => node.level,
  //   node => node.expandable,
  //   node => node.children,
  // );
  
  linksData = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // familiaData = new MatTreeFlatDataSource(this.familiaControl, this.familiaFlattener)
 
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  // hasChildFamilia = (_: number, node: FamiliaNode) => node.expandable;
  
  
  btn : string
  
  constructor( private route:Router) { 
    this.linksData.data = this.TREE_DATA;
    // this.familiaData.data = this.TREE_FAMILIA;
    this.btn = 'salir'
  }

  ngOnInit(): void {
    // console.log(this.familia)
  }

  salir(){
    localStorage.clear()
    this.route.navigateByUrl('/auth')
  }

}
