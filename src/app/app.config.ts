import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco, translocoConfig } from '@ngneat/transloco';

import { AppTranslocoLoader } from './transloco-root';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: translocoConfig({
        availableLangs: ['es', 'en'],
        defaultLang: localStorage.getItem('lang') || 'es',
        fallbackLang: 'es',
        reRenderOnLangChange: true,
        prodMode: false,
        missingHandler: {
          logMissingKey: false,
          useFallbackTranslation: true,
          allowEmpty: true
        }
      }),
      loader: AppTranslocoLoader
    })
  ]
};
