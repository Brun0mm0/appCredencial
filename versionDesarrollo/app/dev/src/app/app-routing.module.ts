import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth',
  loadChildren: ()=> import('./auth/auth.module')
  .then(m=>m.AuthModule)
},
{ path: 'portal',
  loadChildren: ()=> import('./portal/portal.module')
  .then(m=>m.PortalModule)
},
{ path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
