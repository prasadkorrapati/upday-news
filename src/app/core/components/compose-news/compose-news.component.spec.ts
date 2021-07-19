import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeNewsComponent } from './compose-news.component';

describe('ComposeNewsComponent', () => {
  let component: ComposeNewsComponent;
  let fixture: ComponentFixture<ComposeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
