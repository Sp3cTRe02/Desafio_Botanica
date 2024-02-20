import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolGeneralComponent } from './arbol-general.component';

describe('ArbolGeneralComponent', () => {
  let component: ArbolGeneralComponent;
  let fixture: ComponentFixture<ArbolGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbolGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
