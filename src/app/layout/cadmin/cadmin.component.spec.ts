import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadminComponent } from './cadmin.component';

describe('CadminComponent', () => {
  let component: CadminComponent;
  let fixture: ComponentFixture<CadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
