import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation) {
  const error:string = 'Navegador no soporte GeoLocation';
  alert(error);
  throw new Error(error);
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
