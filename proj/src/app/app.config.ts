import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "movie-score-analysis", appId: "1:989557769371:web:f52025371b151dfa8eb23e", storageBucket: "movie-score-analysis.firebasestorage.app", apiKey: "AIzaSyDJK18doerMMkR9wzIz4PoyL2GGxB6e2_s", authDomain: "movie-score-analysis.firebaseapp.com", messagingSenderId: "989557769371", measurementId: "G-6W1YTY0YKL" })), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService
  ]
};
