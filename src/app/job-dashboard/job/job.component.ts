import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { Job, Option } from '../../shared/interfaces';
import { Frequency, ContainerSizes } from '../../shared/enums';


@Component({
  selector: 'js-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @Input() job: Job;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  public containerSizes: Option[];
  public frequency: Option[];
  public lastRun: string;
  public isEditMode: boolean;
  public jobDate: Date;
  public militaryTimes: Array<string>;


  constructor() {
    this.containerSizes = [];
    this.frequency = [];
    this.isEditMode = false;
    this.jobDate = new Date();
    this.militaryTimes = [
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30"
    ];
  }


  /**
   *
   * 
   * 
   * @memberOf JobComponent
   */
  ngOnInit() {
    // see if a run has been done before
    this.lastRun = (this.job && this.job.last_run) ? this.job.last_run : 'NEVER';

    this.containerSizes = Object.keys(ContainerSizes).slice(0, 4)
      .map(size => {
        let new_size = ContainerSizes[size].split('_').join(' ').toUpperCase();
        let sizeObj: Option = { selected: false, name: new_size };

        if(parseInt(size) === this.job.container_size) {
          sizeObj.selected = true;
        }

        return sizeObj;
      });

    this.frequency = Object.keys(Frequency).slice(0, 3)
      .map(fre => {
        let new_fre = Frequency[fre].split('_').join(' ').toUpperCase();
        let freObj: Option = { selected: false, name: new_fre };

        if(parseInt(fre) === this.job.frequency) {
          freObj.selected = true;
        }

        return freObj;
      });
  }


  /**
   * Update the name of the job
   *
   * @param {*} event
   *
   * @memberOf JobComponent
   */
  public updateName(event: any) {
    this.job.name = event.target.value;
  }


  /**
   * Turn on edit mode
   *
   *
   * @memberOf JobComponent
   */
  public activateEditMode() {
    this.isEditMode = !this.isEditMode;
  }


  /**
   * Removes a job
   *
   *
   * @memberOf JobComponent
   */
  public removeJob() {
    this.delete.emit();
  }

}
