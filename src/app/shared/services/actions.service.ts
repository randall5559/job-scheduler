import { Injectable } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';
import { Job } from '../interfaces';

@Injectable()
export class ActionsService {

  constructor(private stateManager: StateManagerService) { }

  public updateJobs(jobs: Job[] ) {
    this.stateManager.update('JobScheduler')(state => {
      return jobs.map(job => {
        return Object.assign({}, job);
      })
    });
  }

}
