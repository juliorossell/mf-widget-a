const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-widget-a',

  // Import shared services from shell in production
  remotes: {
    shell: 'https://shell-app.yourdomain.com/remoteEntry.json'
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
    'cropperjs',
  ],
});
