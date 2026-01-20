// Export del JWT interceptor para ser compartido entre todos los microfrontends
export { JwtInterceptor, BYPASS_JW_TOKEN } from './jwt.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { JwtInterceptor } from './jwt.interceptor';

/**
 * Provider function para configurar el JWT interceptor globalmente
 * Usar en app.config.ts de cada microfrontend y shell
 */
export function provideJwtInterceptor(): Provider[] {
  console.log('🔧 Configurando JWT Interceptor providers...');
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ];
}
