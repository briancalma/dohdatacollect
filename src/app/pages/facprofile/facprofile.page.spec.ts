import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacprofilePage } from './facprofile.page';

describe('FacprofilePage', () => {
  let component: FacprofilePage;
  let fixture: ComponentFixture<FacprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
