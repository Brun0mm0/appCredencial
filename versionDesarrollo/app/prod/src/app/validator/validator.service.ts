import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { delay, map } from "rxjs";
import { DataBaseService } from "../data/data-base.service";

@Injectable({
    providedIn: 'root'
})

export class ValidatorService {

    public emailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z ]{2,5}$";
    constructor() {}

    camposIguales( campo1 : string, campo2 : string ) {
        return ( formGroup : AbstractControl ) : ValidationErrors | null => {
            const pass1 = formGroup.get(campo1)?.value;
            const pass2 = formGroup.get(campo2)?.value;

            if(pass1 !== pass2) {
                formGroup.get(campo2)?.setErrors({ noIguales: true });
                return { noIguales : true };
            }

            formGroup.get(campo2)?.setErrors(null)
            return null;

    }
    }

    dniValidator (data : DataBaseService): AsyncValidatorFn {
        return (control : AbstractControl ) => {
            return data.getEstadoAfiliado({numero: control.value})
                .pipe(
                    delay(1000),
                    map( data => {
                        // console.log(data)
                        if (data.status == 'ok'){
                            return null
                        } else if (data.msg == 'dniNotVigente') {
                            return {dniNotVigente:true}
                        } else if (data.msg == 'dniExists') {
                            return {dniExists:true}
                        } else {
                            return {dniNotFound:true}
                        }
                    })
                )
    }
    }
    
    usuarioValidator (data : DataBaseService): AsyncValidatorFn {
        return (control : AbstractControl ) => {
            return data.getUsuario(control.value)
                .pipe(
                    map( data => {
                        if (data.status == 'ok'){
                            return null
                        } else {
                            return {usuarioExists:true}
                        }
                    })
                )
    }
    }
}

