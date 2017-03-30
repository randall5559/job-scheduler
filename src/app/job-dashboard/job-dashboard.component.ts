import { Component, OnInit } from '@angular/core';
import { DataService, ActionsService, StateManagerService } from '../shared/services';


@Component({
  selector: 'js-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.css']
})
export class JobDashboardComponent implements OnInit {

  /**
   * Creates an instance of JobDashboardComponent.
   *
   * @param {DataService} dataService
   * @param {ActionsService} actions
   * @param {StateManagerService} stateManager
   *
   * @memberOf JobDashboardComponent
   */
  constructor(
    private dataService: DataService,
    private actions: ActionsService,
    private stateManager: StateManagerService) { }


  /**
   *
   *
   *
   * @memberOf JobDashboardComponent
   */
  ngOnInit() {
    // get all saved jobs
    this.getTheJobsData();

    // subscribe to Job Scheduler model
    this.stateManager.getModel('JobScheduler')
      .subscribe(data => {
        console.log(data);
      });
  }


  /**
   *
   *
   *
   * @memberOf JobDashboardComponent
   */
  public addJob() {


  }


  /*********************************
   * private method
   *********************************/

  /**
   *
   *
   * @private
   *
   * @memberOf JobDashboardComponent
   */
  private getTheJobsData() {
    this.dataService.getJobsData()
      .subscribe(data => {
        this.stateManager.setModel('JobScheduler', data);
      });
  }

}
