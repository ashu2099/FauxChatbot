import { Component } from "@angular/core";
import { ResponseGeneratorService } from "./response-generator.service";
import { FlowHandlerService } from "./flow-handler.service";

@Component({
  selector: "bot-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private RG: ResponseGeneratorService,
    private FH: FlowHandlerService
  ) {}

  chatOpen: boolean = false;
  userQuery = "";
  inputText = "";
  previousAnswer = "";
  flowState = {
    flowStarted: false,
    flowStep: 0,
    flowInput: "",
    flowData: {},
    currentFlow: undefined
  };
  conversation = [
    {
      messageFrom: "bot",
      messageText: this.RG.getResponseByKey("response0"),
      messageTime: new Date().toTimeString().split(" ")[0]
    }
  ];

  showChatWindow() {
    this.chatOpen = true;
    document.querySelectorAll(".chat-container")[0].classList.add("chat-open");
  }

  hideChatWindow() {
    this.chatOpen = false;
    document
      .querySelectorAll(".chat-container")[0]
      .classList.remove("chat-open");
  }

  scrollOnNewMessage(time) {
    let chatBody = document.getElementById("cbChatBody");
    window.setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, time);
  }

  createBotMessage(message) {
    this.conversation.push({
      messageFrom: "bot",
      messageText: message,
      messageTime: new Date().toTimeString().split(" ")[0]
    });
    this.scrollOnNewMessage(250);
  }

  createUsermessage(message) {
    this.conversation.push({
      messageFrom: "user",
      messageText: message,
      messageTime: new Date().toTimeString().split(" ")[0]
    });
    this.scrollOnNewMessage(2250);
  }

  postQuery() {
    if (this.inputText != "") {
      this.createUsermessage(this.inputText);
      if (!this.flowState.flowStarted) {
        this.userQuery = this.inputText.toLowerCase();
      } else {
        this.flowState.flowInput = this.inputText;
      }
      this.inputText = "";

      if (!this.flowState.flowStarted) {
        this.createBotMessage(this.recognizeFlowOrRespond());
      } else {
        this.createBotMessage(this.flowState.currentFlow(this.flowState));
      }
    }
  }

  triggerFlow() {
    this.flowState.flowStarted = true;
    return this.flowState.currentFlow(this.flowState);
  }

  recognizeFlowOrRespond() {
    let flowTrigger1 = this.RG.getResponseByKey("response2");
    let flowTrigger2 = this.RG.getResponseByKey("response3");
    let flowTrigger3 = this.RG.getResponseByKey("response7");

    let answer = this.RG.getResponse(this.userQuery);

    if (this.previousAnswer == flowTrigger1 && this.userQuery == "yes") {
      answer = flowTrigger2;
    } else if (
      this.previousAnswer == flowTrigger2 &&
      ["1", "2", "3"].indexOf(this.userQuery) != -1
    ) {
      this.flowState.currentFlow = this.FH.initiateAccountFlow;
      return this.triggerFlow();
    } else if(this.previousAnswer==flowTrigger3){
      this.flowState.currentFlow = this.FH.profanityFlow;
      this.flowState.flowInput = this.userQuery;
      this.previousAnswer = "";
      return this.triggerFlow();
    }

    this.previousAnswer = answer;
    return answer;
  }
}
