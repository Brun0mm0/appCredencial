import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthService } from './auth.service';

import { HeaderComponent } from './components/header/header.component';
import { LoginiComponent } from './pages/logini/logini.component';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';
import { RecoverComponent } from './pages/recover/recover.component';
import { SigninComponent } from './pages/signin/signin.component';
import { FooterComponent } from './components/footer/footer.component';
import { DniComponent } from './components/dni/dni.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { DatosDomicilioComponent } from './components/datos-domicilio/datos-domicilio.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { RecoverDniComponent } from './components/recover-dni/recover-dni.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';



@NgModule({
  declarations: [
    LoginiComponent,
    RecoverComponent,
    SigninComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    DniComponent,
    DatosPersonalesComponent,
    DatosDomicilioComponent,
    DatosUsuarioComponent,
    ConfirmComponent,
    RecoverDniComponent,
    RecoverPasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [ AuthService ]
})
export class AuthModule { }
