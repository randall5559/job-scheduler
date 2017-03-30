import { JobSchedulerPage } from './app.po';

describe('job-scheduler App', () => {
  let page: JobSchedulerPage;

  beforeEach(() => {
    page = new JobSchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
