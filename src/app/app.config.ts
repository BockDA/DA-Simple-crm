import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';



import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNativeDateAdapter(),

    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyD_6lQhnBo7MrYpLt3f3SXAjnBKzzZnQK4',
        authDomain: 'simple-crm-b4ee4.firebaseapp.com',
        projectId: 'simple-crm-b4ee4',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],

  
};
