import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  public isProductVisible: boolean = true;
  
  // Ocurre cuando Angular inicializa el componente
  constructor() { }
  
  // Responde cuando Angular establece o restablece propiedades 
  // de entrada vinculadas a datos. El método recibe un objeto 
  // SimpleChanges de los valores de propiedad actuales y anteriores.
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }
  
  // Inicialice la directiva o el componente después de que 
  // Angular muestre por primera vez las propiedades vinculadas 
  // a datos y establezca las propiedades de entrada de la 
  // directiva o el componente.
  ngOnInit(): void {
    console.log('ngOnInit');
  }

  // Detecta y actúa sobre cambios que Angular no puede o no 
  // quiere detectar por sí solo.
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  // Responde después de que Angular proyecta contenido externo 
  // en la vista del componente o en la vista en la que se 
  // encuentra una directiva.
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  // Responde después de que Angular verifica el contenido 
  // proyectado en la directiva o componente.
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  
  // Responde después de que Angular inicializa las vistas 
  // y las vistas secundarias del componente, o la vista 
  // que contiene la directiva.
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  // Responde después de que Angular verifica las vistas 
  // y las vistas secundarias del componente, o la vista 
  // que contiene la directiva.
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  // Limpiezas justo antes de que Angular destruya la directiva o componente. 
  // Cancele la suscripción de Observables y separe los controladores 
  // de eventos para evitar pérdidas de memoria.
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
