import { DataBaseService } from "src/app/data/data-base.service";
import { Afiliado } from "./afiliado.model";

export class datosAfilidao extends Afiliado {
    constructor(
            private data : DataBaseService,
            private id : Storage,
            ){
            super('')
    }

    dataAfiliado(){
        this.data.credencialId(this.id.getItem('id'))
        .subscribe( afiliado => this.setAfiliado(afiliado.data))
    }
}