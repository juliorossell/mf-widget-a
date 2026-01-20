const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-widget-a',

  // Import shared services from shell when in standalone mode
  remotes: {
    shell: 'http://localhost:4200/remoteEntry.json'
  },

  exposes: {
    './Widget': './projects/mfe-widget-a/src/app/widget-a.component.ts',
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      includeSecondaries: true
    }),
    '@angular/common/http': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    // Angular CDK modules for Fractalia components
    '@angular/cdk/bidi': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@angular/cdk/overlay': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@angular/cdk/portal': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    // Fractalia components shared across all microfrontends
    '@fractalia/components': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@fractalia-apps/components': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    }
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Fractalia dependencies to skip (pero no CDK que lo estamos compartiendo)
    'cropperjs',
    'ng2-charts',
    'chart.js'
  ],
  sharedMappings: [
    '@angular/core',
    '@angular/common',
    '@angular/common/http',
    '@angular/platform-browser',
    '@angular/router',
    'rxjs'
  ],
});
