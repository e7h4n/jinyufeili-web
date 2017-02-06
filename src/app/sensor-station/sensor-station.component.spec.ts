/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SensorStationComponent } from './sensor-station.component';

describe('SensorStationComponent', () => {
  let component: SensorStationComponent;
  let fixture: ComponentFixture<SensorStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
