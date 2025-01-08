import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsVideoComponent } from './kids-video.component';

describe('KidsVideoComponent', () => {
  let component: KidsVideoComponent;
  let fixture: ComponentFixture<KidsVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KidsVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KidsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
