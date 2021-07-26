import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreModule } from '../../core.module';

import { ComposeNewsComponent } from './compose-news.component';

describe('ComposeNewsComponent', () => {
  let component: ComposeNewsComponent;
  let fixture: ComponentFixture<ComposeNewsComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ComposeNewsComponent
      ],
      imports: [
        CoreModule,
        HttpClientModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeNewsComponent);
    component = fixture.componentInstance;
    component.formGroup = formBuilder.group({
      title: ['',Validators.required],
      description: ['', Validators.required],
      imageURL: ['', Validators.email]
    });
    spyOn(component.save, 'emit');
    spyOn(component.back, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBe(undefined);
  });
});
