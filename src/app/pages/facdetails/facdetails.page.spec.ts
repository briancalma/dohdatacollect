import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacdetailsPage } from './facdetails.page';

describe('FacdetailsPage', () => {
  let component: FacdetailsPage;
  let fixture: ComponentFixture<FacdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
