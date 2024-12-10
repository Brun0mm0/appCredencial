import { NgModule } from '@angular/core';

import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { StepsModule } from 'primeng/steps';

@NgModule({
  exports: [
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ScrollingModule,
    StepsModule,
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MatBottomSheet, useValue: {} },
  ]
})
export class MaterialModule { }
