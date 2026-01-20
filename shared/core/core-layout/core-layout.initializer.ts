import { APP_INITIALIZER } from '@angular/core';
import { CoreLayoutService } from './core-layout.service';

export function initialPartnerSetupService(provider: CoreLayoutService) {
  return () => provider.initPartnerSetup();
}

export const coreLayoutInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: initialPartnerSetupService,
  deps: [CoreLayoutService],
  multi: true,
};
