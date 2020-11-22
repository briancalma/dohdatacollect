import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysamplemodalPage } from './mysamplemodal.page';

describe('MysamplemodalPage', () => {
  let component: MysamplemodalPage;
  let fixture: ComponentFixture<MysamplemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysamplemodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysamplemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
