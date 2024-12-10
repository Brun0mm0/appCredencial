import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-emergencia-button',
  templateUrl: './emergencia-button.component.html',
  styleUrls: ['./emergencia-button.component.css']
})
export class EmergenciaButtonComponent {

  constructor( private _bottomSheet: MatBottomSheet ) { }

  openBottomSheet(): void {
    this._bottomSheet.open(EmergenciaButtonComponentContact);
  }

}

@Component({
  selector: 'emergencia-button-contact',
  templateUrl: 'emergencia-button-contact.html',
})
export class EmergenciaButtonComponentContact {
  constructor(private _bottomSheetRef: MatBottomSheetRef<EmergenciaButtonComponentContact>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
