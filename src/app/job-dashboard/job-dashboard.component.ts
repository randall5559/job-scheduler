import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, ActionsService, StateManagerService } from '../shared/services';
import { Job } from '../shared/interfaces/job';
import { Subscription } from 'rxjs';

@Component({
  selector: 'js-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.css']
})
export class JobDashboardComponent implements OnInit, OnDestroy {
  public jobs: Job[];
  public hasJobs: boolean;
  private subscription: Subscription;

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
    private stateManager: StateManagerService) {
      this.hasJobs = false;
    }


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
    this.subscription = <Subscription>this.stateManager.getModel('JobScheduler')
      .subscribe(jobs => {
        this.jobs = jobs;
        this.hasJobs = (jobs.length > 0) ? false : true;
      });
  }


  /**
   * Add a job to the jobs model
   *
   *
   * @memberOf JobDashboardComponent
   */
  public addJob() {
    let new_job: Job = {
      name: 'Unnamed',
      container_size: 0,
      frequency: 0,
      last_run: 'NEVER',
      next_due: new Date().toString(),
      command: null
    }
    let new_jobs = this.jobs.slice(0);

    new_jobs.push(new_job);

    this.actions.updateJobs(new_jobs);
  }


  /**
   * Remove a job for the jobs model
   *
   * @public
   * @param {any} i
   *
   * @memberOf JobDashboardComponent
   */
  public removeJob(i) {
    let new_jobs = this.jobs.slice(0);
    new_jobs.splice(i, 1);
    this.actions.updateJobs(new_jobs);
  }


  /**
   * clean up subscription
   *
   *
   * @memberOf JobDashboardComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        this.stateManager.setModel('JobScheduler', data.jobs);
      });
  }

}
