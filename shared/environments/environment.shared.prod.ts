// Configuraciones compartidas para producción
export const sharedEnvironment = {
  production: true,
  apiEndpoint: 'https://api.smartsupport.devonlineassist.me/',
  STATIC_CONTENT: 'https://devstatic.app.onlineassist.me/suite/',
  STATIC_SERVER: 'https://devstatic.app.onlineassist.me/',
  apiUrl: 'https://api.production.com',
  auth: {
    tokenKey: 'currentUser',
    tokenExpiry: 3600000 // 1 hour in ms
  },
  federation: {
    manifestPath: '/federation.manifest.json'
  }
};
