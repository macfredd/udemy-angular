import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

type gender = 'male' | 'female';
export
interface Client {
  name: string;
  gender: gender;
}

@Component({
  selector: 'products-uncommon-page',
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

  public totalClientsMap = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    'other': 'tenemos # clientes esperando.'
  };

  public changeClient(): void {
    this.selectedClient = this.clients[Math.floor(Math.random() * this.clients.length)];
  }

  public deleteClient(): void {
    this.clients.shift();
  }

  public clientNames(): string[] {
    return this.clients.map(client => client.name);
  }

  public myObservableTimer = interval(1000);
}
