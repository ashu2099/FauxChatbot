import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ResponseMessageComponent } from './response-message/response-message.component';
import { UserQueryComponent } from './user-query/user-query.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponseMessageComponent,
    UserQueryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
