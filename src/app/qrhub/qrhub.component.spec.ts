import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrhubComponent } from './qrhub.component';

describe('QrhubComponent', () => {
  let component: QrhubComponent;
  let fixture: ComponentFixture<QrhubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrhubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
