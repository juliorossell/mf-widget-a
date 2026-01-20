import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Import shared JWT interceptor
import { provideJwtInterceptor } from '../../../shared/interceptors';

// Import CoreLayout service and initializer for standalone mode
import { CoreLayoutService, coreLayoutInitializerProvider } from '../../../shared/core/core-layout';

// Function to check if running in standalone mode
function isStandalone(): boolean {
  // Check if we're running as a standalone app (not loaded as a microfrontend)
  return !window.location.pathname.includes('/mf/') && 
         window.location.port === '4201'; // Widget-A port
}

// Get providers based on mode
function getConditionalProviders(): Provider[] {
  if (isStandalone()) {
    console.log('Widget A running in standalone mode - initializing CoreLayout service');
    return [
      CoreLayoutService,
      coreLayoutInitializerProvider
    ];
  }
  
  console.log('Widget A running as microfrontend - skipping CoreLayout initialization');
  return [];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    // JWT Interceptor compartido - se aplica automáticamente a todas las llamadas HTTP
    ...provideJwtInterceptor(),
    // Conditionally add CoreLayout service in standalone mode
    ...getConditionalProviders()
  ]
};
