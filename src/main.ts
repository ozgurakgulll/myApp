import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import * as ionIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./app/shared/services/token.interceptor";
addIcons(ionIcons);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
  ],
});
