import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergenciaButtonComponent, EmergenciaButtonComponentContact } from './components/emergencia-button/emergencia-button.component';
import { MaterialModule } from '../material/material.module';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    EmergenciaButtonComponent,
    EmergenciaButtonComponentContact,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    EmergenciaButtonComponent,
    EmergenciaButtonComponentContact,
    ButtonComponent
  ],
  providers: [
    MatBottomSheet
  ],

})
export class SharedModule { }
