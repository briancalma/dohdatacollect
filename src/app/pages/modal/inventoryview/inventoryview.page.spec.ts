import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryviewPage } from './inventoryview.page';

describe('InventoryviewPage', () => {
  let component: InventoryviewPage;
  let fixture: ComponentFixture<InventoryviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
