import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BmsMicroService {
  constructor(private http: HttpClient) {}

  getUserLicenceMspObservable() {
    // Usar solo la ruta sin duplicar 'api' - el environment.apiEndpoint ya incluye '/api/'
    return this.http.get(environment.apiEndpoint + 'licence/msp/subscriberid');
  }
}
