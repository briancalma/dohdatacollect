import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymainpagePage } from './mymainpage.page';

describe('MymainpagePage', () => {
  let component: MymainpagePage;
  let fixture: ComponentFixture<MymainpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymainpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymainpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
