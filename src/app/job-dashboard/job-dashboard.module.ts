import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDashboardComponent } from './job-dashboard.component';
import { JobComponent } from './job/job.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JobDashboardComponent, JobComponent],
  exports: [JobDashboardComponent]
})
export class JobDashboardModule { }
