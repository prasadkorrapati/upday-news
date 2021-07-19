import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { News } from '../../types/types';

@Component({
  selector: 'app-compose-news',
  templateUrl: './compose-news.component.html',
  styleUrls: ['./compose-news.component.scss']
})
export class ComposeNewsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() save:EventEmitter<News> =new EventEmitter<News>();
  @Output() back:EventEmitter<void> =new EventEmitter<void>();
  constructor(private router: Router) { }

  ngOnInit(): void { }

  createNews() {
    this.save.emit(this.formGroup.value);
  }
 
  cancel() {
    this.back.emit();
  }

}
