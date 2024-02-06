import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolesFamiliaComponent } from './arboles-familia.component';

describe('ArbolesFamiliaComponent', () => {
  let component: ArbolesFamiliaComponent;
  let fixture: ComponentFixture<ArbolesFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolesFamiliaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbolesFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
