import { Component, OnInit } from '@angular/core';

type gender = 'male' | 'female';
export
interface Client {
  name: string;
  gender: gender;
}

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  //i18nSelect
  public clients: Client[] = [
    { name: 'Freddy', gender: 'male'},
    { name: 'Adrea', gender: 'female'},
    { name: 'Martin', gender: 'male'},
    { name: 'Ana', gender: 'female'}
  ];

  public selectedClient: Client = this.clients[0];

  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  };

  public changeClient(): void {
    this.selectedClient = this.clients[Math.floor(Math.random() * this.clients.length)];
  }
}
