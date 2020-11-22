import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydetailsmodalPage } from './mydetailsmodal.page';

describe('MydetailsmodalPage', () => {
  let component: MydetailsmodalPage;
  let fixture: ComponentFixture<MydetailsmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydetailsmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydetailsmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
