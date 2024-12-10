import { Subject } from "rxjs"
import { Data } from "src/app/interface/afiliado.interface"

export class Afiliado {

    constructor(
        private afiliado : Data | string
    ) {}

    setAfiliado(data : Data) {
        this.afiliado = data
        // console.log(data)
    }
    getAfiliado() {
        // console.log(this.afiliado)
        return this.afiliado
    }
    mostrar(){
        console.log(this.afiliado)
    }
  

    // afiliado = new Subject();
    // _afiliado = this.afiliado.asObservable()

    // setAfiliado(){
        // return this.afiliado.next({ ...this })
    // }

}