import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'like-btn',
  standalone: true,
  imports: [],
  templateUrl: './like-btn.component.html',
  styleUrl: './like-btn.component.css'
})
export class LikeBtnComponent {

  @Input() likes: number = 0;

  @Output() onLike : EventEmitter<number> = new EventEmitter<number>();

  liked() {
    this.likes++;
    this.onLike.emit(1);
  }

}
