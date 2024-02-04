import { Component } from '@angular/core';

interface House {
  title: string;
  description: string;
  lngLat: [number, number];
  price: number;
}

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public houses: House[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466],
      price: 1000000
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748],
      price: 2000000
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ],
      price: 500000
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ],
      price: 300000
    },
    {
      title: 'Casa de Playa, California',
      description: 'Bella Casa en California, vive tu Sueño.',
      lngLat: [ -118.69649785653469, 34.03269832707765 ],
      price: 1500000
    }
  ]

  liked(index: number) {
    console.log(this.houses[index].title + ' liked');
  }
}
