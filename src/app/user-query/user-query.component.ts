import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "bot-user-query",
  templateUrl: "./user-query.component.html",
  styleUrls: ["./user-query.component.css"]
})
export class UserQueryComponent implements OnInit {
  constructor() {}

  @Input() message: any;

  ngOnInit() {}
}
