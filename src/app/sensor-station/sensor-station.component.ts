import { Component, OnInit } from '@angular/core';
import { DataPointService } from '../data-point.service';

@Component({
  selector: 'app-sensor-station',
  templateUrl: './sensor-station.component.html',
  styleUrls: ['./sensor-station.component.css']
})
export class SensorStationComponent implements OnInit {

  constructor(private dataPointService: DataPointService) { }

  ngOnInit() {
  }

}
