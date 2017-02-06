import { Injectable } from '@angular/core';
import { DataPoint } from './data-point';
import { Http, Response } from '@angular/http';

@Injectable()
export class DataPointService {

  constructor (private http: Http) {}

  getDataPoints(type: string): Promise<DataPoint[]> {
    return this.http.get(`/api/sensor/data-points/${type}`).map((res: Response) => {
      return res.json();
    });
  }
}
