export class ClienteModel {
    public id: number;
    public nro_documento: string;
    public nombre: string;
    public direccion: string;
    public trabajo: string;
    public telefono: string;
    constructor(data:any) {
        this.id = data.id-1;
        this.nro_documento = data.nro_documento;
        this.nombre = data.nombre;
        this.direccion = data.direccion;
        this.trabajo = data.lugar_trabajo;
        this.telefono = data.telefono;
    }
}