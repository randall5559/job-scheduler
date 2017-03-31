import { TestBed, inject } from '@angular/core/testing';

import { StateManagerService } from 'sassy-state-manager-ng2';
import { ActionsService } from './actions.service';

describe('ActionsService', () => {
  let stateManager: StateManagerService;
  let actions: ActionsService;

  class MockStateManagerService {
    public update() {
      return () => {};
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActionsService,
        { provide: StateManagerService, useClass: MockStateManagerService }
      ]
    });
  });

  beforeEach(inject([StateManagerService, ActionsService], (_StateManagerService_, _ActionsService_) => {
    stateManager = _StateManagerService_;
    actions = _ActionsService_;

    spyOn(stateManager, 'update').and.callThrough();
  }));

  it('should ...', inject([ActionsService], (service: ActionsService) => {
    expect(service).toBeTruthy();
  }));

  it('should update jobs - updateJobs()', () => {
    actions.updateJobs([]);

    expect(stateManager.update).toHaveBeenCalled();
  });
});
