import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aXRydTYwIiwiYSI6ImNsc3JucXNhazA1cnEyaW1sZngxa2pqNHIifQ.vslWBUZtPTf7cgGyqDQpvg';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
