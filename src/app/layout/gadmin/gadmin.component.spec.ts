import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GadminComponent } from './gadmin.component';

describe('GadminComponent', () => {
  let component: GadminComponent;
  let fixture: ComponentFixture<GadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
