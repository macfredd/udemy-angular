import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitlesComponent } from '@shared/titles/titles.component';

@Component({
  standalone: true,
  imports: [TitlesComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './change-detection.component.html',
  styleUrl: './change-detection.component.css'
})
export class ChangeDetectionComponent {

  public frameworkAsProperty = {
    name: 'Angular',
    version: '12.0.0'
  };

  constructor() { 
    setTimeout(() => {

    
      this.frameworkAsProperty = Object.assign({}, this.frameworkAsProperty, { name: 'React' });
      
      console.log('ChangeDetectionComponent: setTimeout');
    }, 2000);
  }
}
