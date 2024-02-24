import { Component, signal } from '@angular/core';
import { CardComponentComponent } from '@shared/card-component/card-component.component';
import { IfComponent } from './controls/if/if.component';
import { SwitchComponent } from './controls/switch/switch.component';
import { ForComponent } from './controls/for/for.component';

@Component({
  standalone: true,
  imports: [IfComponent, SwitchComponent, ForComponent, CardComponentComponent],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.css'
})
export class ControlFlowComponent {
}
