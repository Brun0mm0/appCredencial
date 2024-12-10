export interface Auth {
    usuraio: string,
    pass:    string
};
export interface Links {
    name:       string;
    children?:  Links[];
    url:        string;
  }
export interface ExampleFlatNode {
    expandable: boolean;
    name:   string;
    url:    string;
    level:  number;
  }

export interface AuthGetAfiliado {
    tipoDoc:    string,
    documento:  string 
}

export interface AuthPostUsuario {
    tipoDoc:        string,
    documento:      string,
    usuario:        string,
    nombre:         string,
    apellido:       string,
    email:          string,
    provincia:      string,
    idProvincia:    string,
    localidad:      string,
    direccion:      string,
    codigoPostal:   string,
    telefono:       string,
    password:       string
}

export interface resAuth {
    status: string,
    token:  string,
    id:     string,
    loc: string
}

export interface Credencial {
    status: string;
    data:   Data;
}

export interface Data {
    familia:        Familia[] | [];
    Titular_ID:     number;
    nombre:         string;
    apellido:       string;
    dni:            string;
    cob_nro:        string;
    cob_ext:        string;
    Vigente:        string;
    Plan:           string;
}


export interface Familia {
    nombre:     string;
    dni:        string;
    children?:  Familia[]
}

export interface FamiliaNode {
    expandable: boolean;
    nombre:     string;
    dni:        string;
    level:      number;
}

export interface Usuario {
    tipoDocumento:  string, 
    documento:      string, 
    usuario:        string, 
    nombre:         string, 
    apellido:       string, 
    email:          string,
    provincia:      string, 
    localidad:      string, 
    direccion:      string, 
    codigoPostal:   string, 
    telefono:       string, 
    password:       string
}