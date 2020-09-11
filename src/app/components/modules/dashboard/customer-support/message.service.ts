import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AuthService } from '../../../../@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  requestReceived = new EventEmitter<string>();
  messageReceived = new EventEmitter<string>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(private auth: AuthService) {
    this.createConnection();
    //this.registerOnServerEvents();
    this.startConnection();
  }

  // sendMessage(message: Message) {
  //   this._hubConnection.invoke('NewMessage', message);
  // }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.auth.getBaseURL() + '/' + 'MessageHub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch((err) => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () {
          this.startConnection();
        }, 5000);
      });
  }

  registerOnNewMessageServerEvents(): void {
    this._hubConnection.on('newMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

  registerOnNewSupportRequestServerEvents(): void {
    this._hubConnection.on('newSupportRequest', (data: any) => {
      this.requestReceived.emit(data);
    });
  }

  invokeSupportConnectionID(supportUserID: number): void {
    this._hubConnection.invoke(
      'GetConnectionId',
      'Support',
      supportUserID.toString()
    );
  }
}
