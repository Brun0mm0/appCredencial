import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, delay, map, of } from "rxjs";
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
                    delay(5000),
                    map( data => {
                        console.log(data)
                        if(data.status === 'ok') {return null}
                        return { error: true, msg: data.msg };
                        }),
                        catchError( err => {
                            console.log(err.message)
                            return of({error:true, msg:err.message})
                    }  
                ))
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

