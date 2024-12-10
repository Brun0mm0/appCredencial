// export interface Response {
//     status: string;
//     data?:   any[] | any;
// }

export interface Data {
    data : Localidad[]
}

export interface Localidad {
    loc_id: number,
    loc_des: string,
    pro_cod: string,
    pro_des: string

}
