// Shared Fractalia Components exports
// Este archivo facilita la importación de componentes Fractalia en todos los microfrontends

// Re-export los componentes más comunes de @fractalia/components
export { FraButtonComponent } from '@fractalia/components';
export { FraTextfieldComponent } from '@fractalia/components';
export { FraDropdownComponent } from '@fractalia/components';
export { FraCheckboxComponent } from '@fractalia/components';
export { FraIconComponent } from '@fractalia/components';
export { FraLoaderComponent } from '@fractalia/components';

// Re-export algunos componentes de @fractalia-apps/components
export * from '@fractalia-apps/components';

// Funciones helper para importar módulos específicos
export const getFractaliaComponentsModule = () => import('@fractalia/components');
export const getFractaliaAppsComponentsModule = () => import('@fractalia-apps/components');

// Lista de componentes disponibles para referencia
export const AVAILABLE_FRACTALIA_COMPONENTS = [
  'FraButtonComponent',
  'FraTextfieldComponent',
  'FraDropdownComponent',
  'FraCheckboxComponent',
  'FraTabsComponent',
  'FraIconComponent',
  'FraLoaderComponent',
  'FraTooltipComponent'
] as const;
