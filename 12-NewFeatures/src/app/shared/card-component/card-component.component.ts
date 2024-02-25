import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent {

@Input() public cardTitle = '';
@Input() public cardContent = '';

  public showContent = signal(true);

  public hideIcon = 'fa-regular fa-eye-slash';
  public showIcon = 'fa-regular fa-eye';
  public displayIcon = this.hideIcon;

  toggleContent() {
    this.showContent.update( value => {
      if (value) {
        this.displayIcon = this.showIcon;
      } else {
        this.displayIcon = this.hideIcon;
      }
      return !value;
    });
  }
}
