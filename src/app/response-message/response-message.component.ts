import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "bot-response-message",
  templateUrl: "./response-message.component.html",
  styleUrls: ["./response-message.component.css"]
})
export class ResponseMessageComponent implements OnInit {
  constructor() {}

  @Input() message: any;
  showContent: boolean = false;

  ngOnInit() {
    window.setTimeout(() => {
      this.showContent = true;
    }, 2000);
  }
}
