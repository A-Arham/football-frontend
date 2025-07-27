import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule),  // add this line
  ],
}).catch(err => console.error(err));
