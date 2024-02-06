import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaAdminComponent } from './familia-admin.component';

describe('FamiliaAdminComponent', () => {
  let component: FamiliaAdminComponent;
  let fixture: ComponentFixture<FamiliaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamiliaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamiliaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
