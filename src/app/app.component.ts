import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FireChat';
  chats: Observable<any[]>;
  constructor(firestore: AngularFirestore, public chatService: ChatService) {
    this.chats = firestore.collection('chats').valueChanges();
  }

}
