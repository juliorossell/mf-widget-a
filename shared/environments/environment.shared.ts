// Configuraciones compartidas entre microfrontends
export const sharedEnvironment = {
  production: false,
  apiEndpoint: 'https://api.smartsupport.devonlineassist.me/',
  STATIC_CONTENT: 'https://devstatic.app.onlineassist.me/suite/',
  STATIC_SERVER: 'https://devstatic.app.onlineassist.me/',
  apiUrl: 'http://localhost:3000/api',
  auth: {
    tokenKey: 'currentUser',
    tokenExpiry: 3600000, // 1 hour in ms
  },
  federation: {
    manifestPath: '/federation.manifest.json',
  },
};
