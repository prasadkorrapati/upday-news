import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsCardComponent } from './news-card.component';

xdescribe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCardComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    component.news = {
      author: 'korrapatiprasad9@gmail.com',
      boardId: 'en',
      createdAt: new Date().toISOString(),
      description: 'news Long description',
      title: 'Big breaking news',
      status: null,
      id: null,
      imageURL: 'https://www.upday.com/wp-content/themes/upday/images/upday-logo-black.svg'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
