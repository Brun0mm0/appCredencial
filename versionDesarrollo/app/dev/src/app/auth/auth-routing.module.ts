import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DatosDomicilioComponent } from './components/datos-domicilio/datos-domicilio.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { DniComponent } from './components/dni/dni.component';
import { GuardsGuard } from './guards.guard';
import { LoginiComponent } from './pages/logini/logini.component';
import { MainComponent } from './pages/main/main.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes : Routes = [
    { path: '',
      component: MainComponent,
      children: [
          {path: 'login', component: LoginiComponent},
          {path: 'signin', component: SigninComponent,
            children:[
                {path:'dni', component: DniComponent},
                {path:'datos-personales', component: DatosPersonalesComponent, 
                // canActivate:[GuardsGuard]
            },
                {path:'datos-domicilio', component: DatosDomicilioComponent},
                {path:'datos-usuario', component: DatosUsuarioComponent},
                {path:'**', redirectTo:'dni'}
            ]},
          {path: 'recover/:token', component: RecoverComponent},
          {path: 'confirm/:id', component: ConfirmComponent},
          {path: '**', redirectTo: 'login'},
      ]
}
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
})

export class AuthRoutingModule {}