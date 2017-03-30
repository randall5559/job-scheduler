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
import { HeaderModule } from './header/header.module';
import { JobDashboardModule } from './job-dashboard/job-dashboard.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    JobDashboardModule
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
