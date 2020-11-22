import { TestBed } from '@angular/core/testing';

import { InventoryapiService } from './inventoryapi.service';

describe('InventoryapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryapiService = TestBed.get(InventoryapiService);
    expect(service).toBeTruthy();
  });
});
