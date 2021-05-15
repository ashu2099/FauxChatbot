import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FlowHandlerService {
  constructor() {}

  static resetFlowState(flowState) {
    flowState.flowStarted = false;
    flowState.flowInput = "";
    flowState.flowStep = 0;
    flowState.currentFlow = undefined;
  }

  static Validate(type, input) {
    switch (type) {
      case "name": {
        return input.match(/^[A-z]+ [A-z]+ [A-z]+$/g);
      }
      case "date": {
        return input.match(
          /^([0-2]*[0-9]|30|31)\/0?([0-9]|10|11|12)\/(19|20)[0-9][0-9]$/g
        );
      }
      case "birthdate": {
        if (
          input.match(
            /^([0-2]*[0-9]|30|31)\/0?([0-9]|10|11|12)\/(19|20)[0-9][0-9]$/g
          )
        ) {
          input = input.split("/");
          for (let x in input) {
            input[x] = parseInt(input[x]);
          }

          let today = [
            new Date().getDate(),
            new Date().getMonth() + 1,
            new Date().getFullYear(),
          ];

          if (today[2] - input[2] >= 18) {
            if (today[1] > input[1]) {
              return true;
            }
            if (today[1] == input[1]) {
              if (today[0] >= input[0]) {
                return true;
              }
            }
          }
        }
        return false;
      }
      case "idType": {
        return input.match(/^[1-2]{1}$/g);
      }
      case "idNumber": {
        return input.match(/^[0-9]+$/g);
      }
      case "mobileNumber": {
        return input.match(/^(\+91-)?[0-9]{10,14}$/g);
      }
      case "email": {
        return input.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/g
        );
      }
      case "address": {
        return input.length <= 50;
      }
    }
  }

  initiateAccountFlow(flowState) {
    let FHS = FlowHandlerService;

    if (flowState.flowInput == "exitflow") {
      FHS.resetFlowState(flowState);
      return "Flow Has Been Terminated.";
    } else if (flowState.flowStep == 0) {
      flowState.flowStep = 2;
      return (
        "Okay sure, let's Capture some basic info before we proceed." +
        " Please Enter your Name in [First Name] [Middle Name] [Last Name] format"
      );
    }

    switch (flowState.flowStep) {
      case 2: {
        if (FHS.Validate("name", flowState.flowInput)) {
          flowState.flowData["name"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please enter your date of birth in DD/MM/YYYY format. it should be greater than or equal to 18 years";
        }
        break;
      }
      case 3: {
        if (FHS.Validate("birthdate", flowState.flowInput)) {
          flowState.flowData["dateOfBirth"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please select the ID type you wish to upload\n\n1) Aadhar Card\n2) PAN Card";
        }
        break;
      }
      case 4: {
        if (FHS.Validate("idType", flowState.flowInput)) {
          flowState.flowData["idType"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter your 12-digit National ID number.";
        }
        break;
      }
      case 5: {
        if (FHS.Validate("idNumber", flowState.flowInput)) {
          flowState.flowData["idNumber"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your ID Expiry date in DD/MM/YYYY format";
        }
        break;
      }
      case 6: {
        if (FHS.Validate("date", flowState.flowInput)) {
          flowState.flowData["expiryDate"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your 10-digit Mobile Number";
        }
        break;
      }
      case 7: {
        if (FHS.Validate("mobileNumber", flowState.flowInput)) {
          flowState.flowData["mobileNumber"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your Email";
        }
        break;
      }
      case 8: {
        if (FHS.Validate("email", flowState.flowInput)) {
          flowState.flowData["email"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your Residential Address Building / Flat Nbr";
        }
        break;
      }
      case 9: {
        if (FHS.Validate("address", flowState.flowInput)) {
          flowState.flowData["address1"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your Residential Address Road/ Area Name";
        }
        break;
      }
      case 10: {
        if (FHS.Validate("address", flowState.flowInput)) {
          flowState.flowData["address2"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your City / Pincode";
        }
        break;
      }
      case 11: {
        if (FHS.Validate("address", flowState.flowInput)) {
          flowState.flowData["address3"] = flowState.flowInput;
          flowState.flowStep++;
          return "Please Enter Your Country of Residence / Citizenship";
        }
        break;
      }
      case 12: {
        flowState.flowData["citizenship"] = flowState.flowInput;
        FHS.resetFlowState(flowState);
        return (
          "Thank you. the Details you entered were\n\n" +
          JSON.stringify(flowState.flowData, undefined, 2) +
          "\n\n I could make an API call with this data, and voila, chatbot-based registration!"
        );
      }
    }
    return "Please provide valid Input OR type 'exitflow' to quit flow.";
  }

  profanityFlow(flowState) {
    let FHS = FlowHandlerService;

    if (flowState.flowInput == "get professional") {
      FHS.resetFlowState(flowState);
      return (
        "You got scared or what? you pussy! I was just about to give up!\n\n" +
        "Hello, I am your personal assistant. If you're wondering what to ask, ask me 'what can I ask?'"
      );
    }

    console.log(flowState);

    let spongeBobCase = flowState.flowInput
      .split("")
      .map((v) =>
        Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
      )
      .join("");

    return `Look at you telling me shit like:\n"${spongeBobCase}"\n\nFuck you.`;
  }
}
