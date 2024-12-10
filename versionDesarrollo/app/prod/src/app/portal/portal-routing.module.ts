import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartillaComponent } from './pages/cartilla/cartilla.component';
import { CredencialComponent } from './pages/credencial/credencial.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '',
    component: MainPageComponent,
    children:[
      {path:'credencial/:ben_id', component: CredencialComponent},
      {path:'cartilla/:plan', component: CartillaComponent}
    ]
  },
  // { path: '**', redirectTo: `credencial/${localStorage.getItem('id')}`}
  { path: '**', redirectTo: `cartilla`}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class PortalRoutingModule {}
