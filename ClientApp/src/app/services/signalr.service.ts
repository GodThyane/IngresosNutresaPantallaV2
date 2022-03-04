import {Injectable} from '@angular/core';
import {HttpTransportType, HubConnectionBuilder} from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubConnection: any;

  constructor() {
  }

  startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/toastr', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connection Started!');
      })
      .catch((error: any) => console.log('Error while starting connection: ' + error))
  }

  askServer() {
    this.hubConnection.invoke("askServer", "hey")
      .catch((err: any) => {
        console.error(err);
      })
  }

  askServerListener() {
    this.hubConnection.on("askServerResponse", (someText: any) => {
      console.log(someText)
    })
  }
}
