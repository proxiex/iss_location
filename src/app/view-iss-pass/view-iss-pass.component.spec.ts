import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssPassComponent } from './view-iss-pass.component';

describe('ViewIssPassComponent', () => {
  let component: ViewIssPassComponent;
  let fixture: ComponentFixture<ViewIssPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
