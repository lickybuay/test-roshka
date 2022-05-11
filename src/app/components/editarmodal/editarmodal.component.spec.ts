import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmodalComponent } from './editarmodal.component';

describe('EditarmodalComponent', () => {
  let component: EditarmodalComponent;
  let fixture: ComponentFixture<EditarmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
