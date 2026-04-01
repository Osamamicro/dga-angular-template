import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgaComponents } from './dga-components';

describe('DgaComponents', () => {
  let component: DgaComponents;
  let fixture: ComponentFixture<DgaComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
