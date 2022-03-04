import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpTransportType, HubConnectionBuilder} from "@aspnet/signalr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  name = new FormControl('');
  connection: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.connection = new HubConnectionBuilder().withUrl("https://localhost:5001/department", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();

    this.connection.start().then(() => console.log('Conexión Success')).catch((e:any) => console.log('Error'));
  }

  save() {
    console.log('Hola')
    this.connection.invoke('SendWorker', '1', this.name.value).catch((e:any) => console.log(e));
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
