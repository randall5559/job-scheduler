import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,} from '@angular/core/testing';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { JobDashboardComponent } from './job-dashboard.component';
import {
  DataService,
  StateManagerService,
  ActionsService } from '../shared/services';
import { Job } from '../shared/interfaces';


describe('JobDashboardComponent', () => {
  let component: JobDashboardComponent;
  let fixture: ComponentFixture<JobDashboardComponent>;
  let dataService: DataService;
  let stateManager: StateManagerService;
  let actions: ActionsService;
  let fakeData = {
    "jobs" : [
      {
          "name": "test",
          "container_size": 1,
          "frequency": 1,
          "last_run": "",
          "next_due": "",
          "command": ""
      }
    ]
  };

  let spyGetJobsData = jasmine.createSpy('getJobsData');
  let spyGetModel = jasmine.createSpy('getModel');
  let spySetModel = jasmine.createSpy('setModel');
  let spyUpdateJobs = jasmine.createSpy('spyUpdateJobs');

  class MockDataService {

    public getJobsData() {
      spyGetJobsData(fakeData);
      return new BehaviorSubject(fakeData);
    }
  }

  class MockStateManagerService {
    getModel(name): BehaviorSubject<any> {
      spyGetModel(name);
      let obsBS = new BehaviorSubject(fakeData.jobs);
      return obsBS;
    }

    setModel() {
      spySetModel();
    }
  }

  class MockActionsService {

    public updateJobs(jobs: Job[] ) {
      spyUpdateJobs(jobs);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ JobDashboardComponent ],
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: StateManagerService, useClass: MockStateManagerService },
        { provide: ActionsService, useClass: MockActionsService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(inject([DataService, StateManagerService, ActionsService],(_DataService_, _StateManagerService_, _ActionsService_) => {
    dataService = _DataService_;
    stateManager = _StateManagerService_;
    actions = _ActionsService_;

    fixture = TestBed.createComponent(JobDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Life Cycle Hook Methods', () => {
    it('should setup model from OnInit() call', () => {
      expect(spyGetJobsData).toHaveBeenCalledWith(fakeData);
      expect(spyGetModel).toHaveBeenCalledWith('JobScheduler');
      expect(spySetModel).toHaveBeenCalled();
    });
  });

  describe('Custom Methods', () => {
    it('should add a job - addJob()', () => {
      let new_job: Job = {
        name: 'Unnamed',
        container_size: 0,
        frequency: 0,
        last_run: 'NEVER',
        next_due: new Date().toString(),
        command: null
      }

      component.jobs = fakeData.jobs;
      component.addJob();

      fakeData.jobs.push(new_job);

      expect(spyUpdateJobs).toHaveBeenCalledWith(fakeData.jobs);
    });

    it('should remove a job - removeJob()', () => {
      component.removeJob(1);

      expect(spyUpdateJobs).toHaveBeenCalled();
    });
  });


});
