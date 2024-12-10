import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CartillaComponent } from './pages/cartilla/cartilla.component';
import { CredencialComponent } from './pages/credencial/credencial.component';
import { MaterialModule } from '../material/material.module';
import { PortalService } from './portal.service';
import { S300Component } from './pages/s300/s300.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './pages/cartilla/components/table/table.component';
import { ContactoComponent } from './pages/cartilla/components/contacto/contacto.component';



@NgModule({
  declarations: [
    CartillaComponent,
    CredencialComponent,
    MainPageComponent,
    S300Component,
    SidenavComponent,
    TableComponent,
    ContactoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PortalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    PortalService
  ]
})
export class PortalModule { }
