import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import axios from 'axios';
import { ClienteModel } from 'src/app/model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private sesionVar = 'cliente';
  private clienteSesion = [];
  private clienteInfo = new Subject<any>(); //Valor modificado para cargar el componente

  constructor() { }

  getStorage(){
    return JSON.parse(localStorage.getItem(this.sesionVar) || '[]');
  }
  setStorage(item:any){
    localStorage.setItem(this.sesionVar, JSON.stringify(item));
  }
  clearStorage(){
    localStorage.clear();
  }
  /**
   * Devuelve el listado de clientes y mantiene el observable
   * @returns observable de clientes
   */
  suscribeClienteInfo() {
    return this.clienteInfo.asObservable();
  }
  /**
   * Devuelve el listado de clientes y mantiene el observable
   * @returns observable de clientes
   */
  getClienteInfo() {
    if(this.getStorage().length!=0){
      this.setClienteInfo(this.getStorage());
      return;
    }
    var api = "https://my.api.mockaroo.com/roshka_test.json?key=4160c8d0";
    axios.get(api).then(res => {
      let data = res.data.map( (data: any) => new ClienteModel(data));      
      this.setClienteInfo(data);
    });
  }

  /**
   * Setea el listado de clientes y mantiene el observable
   */
  setClienteInfo(cli:any) {
    this.setStorage(cli);
    this.clienteInfo.next(cli);
  }

}
