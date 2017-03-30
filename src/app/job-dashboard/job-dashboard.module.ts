import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDashboardComponent } from './job-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JobDashboardComponent],
  exports: [JobDashboardComponent]
})
export class JobDashboardModule { }
