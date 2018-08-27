import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd";

const todoUrl = 'http://localhost:3000/todos';

@Component({
  selector: "app-todos-list",
  templateUrl: "./todos-list.component.html",
  styleUrls: ["./todos-list.component.css"]
})
export class TodosListComponent implements OnInit {
  loading = true; // bug
  loadingMore = false;
  showLoadingMore = true;
  data = [];

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.getData((res: any) => {
      this.data = res;
      this.loading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(todoUrl).subscribe((res: any) => callback(res));
  }

  edit(item: any): void {
    this.msg.success(item.text);
  }
}
