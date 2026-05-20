import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation, Routes } from '@angular/router';
import { ListaSzerszamComponent } from './lista-szerszam.component';
import { NewSzerszamComponent } from './new-szerszam.component';

const routes: Routes = [
  { path: '', component: ListaSzerszamComponent, pathMatch: 'full' },
  { path: 'new', component: NewSzerszamComponent },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation())
  ]
};
