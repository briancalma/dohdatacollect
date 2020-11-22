import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryrptPage } from './inventoryrpt.page';

describe('InventoryrptPage', () => {
  let component: InventoryrptPage;
  let fixture: ComponentFixture<InventoryrptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryrptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryrptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
