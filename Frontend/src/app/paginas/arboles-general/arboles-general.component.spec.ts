import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolesGeneralComponent } from './arboles-general.component';

describe('ArbolesGeneralComponent', () => {
  let component: ArbolesGeneralComponent;
  let fixture: ComponentFixture<ArbolesGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolesGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbolesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
