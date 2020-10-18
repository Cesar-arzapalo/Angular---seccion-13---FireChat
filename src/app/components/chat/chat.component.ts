import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from '../../providers/chat.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  forms: FormGroup;
  elemento: HTMLElement;
  ngOnInit(){
    this.crearFormulario();
    this.elemento = document.getElementById('app-mensajes');
  }

  crearFormulario(){
    this.forms = this.fb.group( {
      mensaje: ['']
    });
  }

  constructor(private fb: FormBuilder, public chatServices: ChatService ) {
    this.chatServices.cargarMensajes(this.elemento).
      subscribe(() => {
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      });
   }

  enviar_mensaje(){
    const mensaje = this.forms.get('mensaje').value;
    console.log(mensaje);
    console.log(1);
    if (mensaje === ''){
      return;
    }

    this.chatServices.agregarMensaje(mensaje)
      .then( () => {
        this.forms.get('mensaje').setValue('');
        this.elemento.scrollTop = this.elemento.scrollHeight;
      })
      .catch( () => console.error('Mensaje no enviado'));
  }

}
