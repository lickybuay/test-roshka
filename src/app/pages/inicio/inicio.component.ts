import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ClientesService } from 'src/app/services/clientes.service/clientes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  canEdit:boolean = false;
  clientes:any = [];
  activeUser: any = {
      id: null,
      nombre: null,
      nro_documento: null,
      direccion: null,
      trabajo: null,
      telefono: null,
  };
  loading:boolean = false;
  usuariosForm: FormGroup;

  constructor(
    private clientesApi:ClientesService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.usuariosForm = new FormGroup({
        id: new FormControl(this.activeUser.id),
        nombre: new FormControl(this.activeUser.nombre),
        nro_documento: new FormControl(this.activeUser.nro_documento),
        direccion: new FormControl(this.activeUser.direccion),
        trabajo: new FormControl(this.activeUser.trabajo),
        telefono: new FormControl(this.activeUser.telefono),
    });
  }

  ngOnInit(): void {
    this.loading=true;
    this.clientesApi.suscribeClienteInfo().subscribe(res=>{
        //Timeout para poder ver el loading
        // setTimeout(() => {
          this.clientes = res;
          this.loading=false;          
        // }, 1000);
    });
    this.clientesApi.getClienteInfo();
  }

  cargarDesdeApi(){
    this.loading=true;
    this.clientesApi.clearStorage();
    this.clientesApi.getClienteInfo();
  }

  actualizarUsuario(){
    if(!confirm('Está seguro que quiere actualizar al registro?')){
      return ;
    }
    let userUpdated = this.usuariosForm.value;
    let idActive = userUpdated.id;
    this.clientes[idActive] = userUpdated;
    this.clientesApi.setClienteInfo(this.clientes);
    this.modalService.dismissAll();
  }

  openModal(content:any, editar:boolean, id:number){
    let idActive = id;
    this.canEdit = editar;
    this.activeUser = this.clientes[idActive];
    this.usuariosForm.setValue(this.activeUser);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

}
