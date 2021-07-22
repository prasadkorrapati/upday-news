import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { News } from '../../../types';

@Component({
  selector: 'app-compose-news',
  templateUrl: './compose-news.component.html',
  styleUrls: ['./compose-news.component.scss']
})
export class ComposeNewsComponent {
  @Input() formGroup: FormGroup;
  @Output() save: EventEmitter<News> = new EventEmitter<News>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  createNews(): void {
    this.save.emit(this.formGroup.value);
  }

  cancel(): void {
    this.back.emit();
  }
}
