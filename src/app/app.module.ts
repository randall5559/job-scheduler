import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  StateManagerService,
  DataService,
  ActionsService
 } from './shared/services';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    StateManagerService,
    DataService,
    ActionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  /**
   * Creates an instance of AppModule.
   * 
   * @param {StateManagerService} stateManager
   * 
   * @memberOf AppModule
   */
  constructor(private stateManager: StateManagerService) {
    /** Job Scheduler Model */
    stateManager.createModel('JobScheduler');
    stateManager.setModel('JobScheduler', {});
  }
}
