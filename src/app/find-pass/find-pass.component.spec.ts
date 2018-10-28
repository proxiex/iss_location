import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPassComponent } from './find-pass.component';

describe('FindPassComponent', () => {
  let component: FindPassComponent;
  let fixture: ComponentFixture<FindPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
