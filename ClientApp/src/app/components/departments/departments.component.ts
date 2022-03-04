import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentsService} from "../../services/departments.service";
import {FormControl} from "@angular/forms";
import {HttpTransportType, HubConnectionBuilder} from "@aspnet/signalr";
import {animate, style, transition, trigger} from "@angular/animations";
import {interval} from "rxjs";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('50ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('50ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  departments: any[] = [];
  departmentId: any;
  departmentControl = new FormControl('')
  connection: any;
  isUpdate = false;
  workers: string[] = [];

  constructor(private departmentsService: DepartmentsService) {
  }

  ngOnInit(): void {
    this.getDepartments();
    this.updateWorker();
    this.connection = new HubConnectionBuilder().withUrl("https://localhost:5001/department", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();
    this.connection.on("ReceiveWorker", (worker: string) => {
      this.workers.unshift(worker);
      if (!this.isUpdate) {
        this.updateWorker();
      }
    })
    this.departmentControl.valueChanges.subscribe(value => {
      this.workers = [];
      if (!this.departmentId) {
        this.departmentId = value.key;
        this.connection.start().then(() => {
          this.connection.invoke("AddToGroup",  this.departmentId.toString()).catch((err: any) => console.error(err))
        }).catch((error: any) => console.error(error))
      } else {
        this.connection.invoke("RemoveToGroup", this.departmentId.toString()).catch((err: any) => console.error(err))
        this.departmentId = value.key;
        this.connection.invoke("AddToGroup", this.departmentId.toString()).catch((err: any) => console.error(err))
      }
    })
  }
  private getDepartments() {
    this.departmentsService.getDepartments().subscribe(res => {
      this.departments = res;
    })
  }

  private updateWorker() {
    if (this.workers.length > 0) {
      this.isUpdate = true;
      setTimeout(() => {
        const workersAux = [...this.workers];
        this.workers = [];
        setTimeout(() => {
            this.workers.forEach(w => {
              workersAux.unshift(w);
            })
            workersAux.pop();
            this.workers = workersAux
          this.updateWorker();
        }, 50)
      }, 3000)
    } else {
      this.isUpdate = false;
    }
  }

  ngOnDestroy(): void {
  }
}
