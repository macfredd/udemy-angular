import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public user = signal<User>({
      id:2,
      email:'janet.weaver@reqres.in',
      first_name:'Janet',
      last_name:'Weaver',
      avatar:'https://reqres.in/img/faces/2-image.jpg'
  });

  public fullName = computed<string>(() => { 
    return this.user()?.first_name + 
      ' '
      + this.user()?.last_name});

  public userChangeEffect = effect(() => {
    console.log(this.user().first_name + ' ' + this.user().last_name + ' has been updated');
  });

  onFieldUpdated(field: keyof User, value:string){
    //this.user.set({...this.user(), [field]: value});
    this.user.update((current) => ({...current, [field]: value}));
  }
}
