import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from "./task/task.module";
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { UserConfigInterface } from './shared/routes/userConfigInterface';
import { DeactivateGuard } from './services/DeactivateGuardService';



@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskModule
],
  providers: [DeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
