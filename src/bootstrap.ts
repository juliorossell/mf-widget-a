import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { WidgetAComponent } from './app/widget-a.component';

bootstrapApplication(WidgetAComponent, appConfig)
  .catch((err) => console.error(err));
