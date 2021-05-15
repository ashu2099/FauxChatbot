import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ResponseGeneratorService {
  constructor() {}

  FALLBACK_MESSAGE =
    "Sorry I'm not smart enough to get that. you'll need to contact with our team to resolve your query, hence making me useless.";

  RESPONSE_MAPPER = {
    response1: ["what", "can", "ask", "i"],
    response2: ["product", "offer"],
    response3: ["feature", "offer"],
    response4: ["hi"],
    response5: ["hello"],
    response6: ["how are"],
    response7: ["get", "profane"],
  };

  RESPONSES = {
    response0:
      'Hello, I am your personal assistant. If you\'re wondering what to ask, ask me "what can I ask?"',
    response1:
      "You can ask about product offers, to test my advance question answer flow and input validations (I used to be a banking chatbot), \n\nor\njust some random questions, until you find one in my if-else list. they're fairly probable, try your luck!\n\nor\nyou can have some real fun by turning profanity on, type 'get profane' to activate",
    response2:
      "Different products have differntial features , the basic account features will include free debit card, SMS notification service, Cheque book, Zero fees for online transfers, Zero fees for draft issuance.\n\n Enter 'Yes' to select product and open account",
    response3:
      "Kindly Select the product which needs to be opened\n1. Super Saver Account\n2. Flexi Deposit Account\n3. Max Gain Account\n Enter Product Number to Continue Account Opening.",
    response4: "Hey, yourself! Ask me a question.",
    response5: "Hello, there! How may I help you today? ",
    response6: "I am doing fine, thank you.",
    response7:
      "oh ho hoo, somebody wants to have some real fun! type 'get professional' whenever your bitch-ass gets scared of my profanity.\n\nSsup motherfucker!",
  };

  getResponse(query) {
    for (let x in this.RESPONSE_MAPPER) {
      let score = 0;
      for (let i of this.RESPONSE_MAPPER[x]) {
        if (query.indexOf(i) == -1) {
          break;
        } else {
          score++;
          if (score == this.RESPONSE_MAPPER[x].length) {
            return this.RESPONSES[x];
          }
        }
      }
    }

    return this.FALLBACK_MESSAGE;
  }

  getResponseByKey(key) {
    return this.RESPONSES[key] ? this.RESPONSES[key] : this.FALLBACK_MESSAGE;
  }
}
