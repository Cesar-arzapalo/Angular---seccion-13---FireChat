import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.Interface';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsColection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuario: any = {};

  constructor(private afs: AngularFirestore, private authentication: AngularFireAuth) {
    this.authentication.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if (user){
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      }
    });
   }

  login(providerAccount: string) {
    if (providerAccount === 'google'){
      this.authentication.signInWithPopup(new auth.GoogleAuthProvider());
    }else if (providerAccount === 'twitter'){
      this.authentication.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.authentication.signOut();
  }
  cargarMensajes(elemento: HTMLElement){
    this.itemsColection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc').limitToLast(5));

    return this.itemsColection.valueChanges()
            .pipe(map((mensaje: Mensaje[]) => {
              this.chats = mensaje;
            }));
  }

  agregarMensaje(texto: string){
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    return this.itemsColection.add(mensaje);
  }
}
