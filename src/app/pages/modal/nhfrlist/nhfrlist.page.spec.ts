import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhfrlistPage } from './nhfrlist.page';

describe('NhfrlistPage', () => {
  let component: NhfrlistPage;
  let fixture: ComponentFixture<NhfrlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhfrlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhfrlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
