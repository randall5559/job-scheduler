import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {


  /**
   * Creates an instance of DataService.
   *
   * @param {Http} Http
   *
   * @memberOf DataService
   */
  constructor(private Http: Http) { }


  /**
   *
   *
   * @returns {Observable<any>}
   *
   * @memberOf DataService
   */
  public getJobsData(): Observable<any> {
    let url: string = '../../../assets/jobs.json';

    return this.Http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

}
