import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { onTopic, publish } from '../../shared/mf-bus/mf-bus';
import {
  MicrofrontsState,
  MicrofrontsStatePayload,
  Topics,
  UiToastPayload,
} from '../../shared/mf-bus/events';
import { userMock } from '../../shared/mocks/auth-mock';

// Import dynamic render components
import { RenderComponentDirective } from '../../shared/core/dynamic-render/render-component.directive';
import { DynamicRenderComponentService } from '../../shared/core/dynamic-render/dynamic-render-component.service';
import { PageComplete } from './page-complete/page-complete';
import { HomeCard } from './home-card/home-card';
import { ControlPanel } from './control-panel/control-panel';

@Component({
  standalone: true,
  selector: 'app-widget-a',
  imports: [RenderComponentDirective],
  templateUrl: './widget-a.component.html',
  styleUrls: ['./widget-a.component.scss'],
  providers: [DynamicRenderComponentService],
})
export class WidgetAComponent implements OnInit, OnDestroy {
  value = 27;

  private isStandalone: boolean = true;
  private destroy$ = new Subject<void>();

  @ViewChild(RenderComponentDirective, { static: false })
  dynamicHost!: RenderComponentDirective;

  constructor(private dynamicRenderService: DynamicRenderComponentService) {}

  ngOnInit(): void {
    this.loadDataToStandalone();
    this.watchBusEvents();
  }

  increment() {
    this.value++;
  }

  toast() {
    const payload: UiToastPayload = { kind: 'info', message: 'Hola desde Catalog' };
    publish(Topics.UiToast, payload, { source: 'catalog', version: '1.0.0' });
  }

  payment_in_proccess() {
    console.log('Publishing payment in processing...');
    publish(
      Topics.PaymentsStatusChanged,
      {
        payment_id: 1,
        payment_amount: 200,
        currency: 'PEN',
        status: 'PROCESSING',
        client: { name: 'Julio' },
      },
      { source: 'payments', version: '1.0.0', correlationId: crypto.randomUUID() }
    );
  }

  loadDataToStandalone() {
    if (this.isStandalone) {
      console.log('Loading data for standalone mode...');
      // Add your data loading logic here
      localStorage.setItem('currentUser', JSON.stringify(userMock));

      const widgetData: MicrofrontsStatePayload = {
        state: MicrofrontsState.ControlPanel,
        data: { info: 'Widget A loaded in standalone mode' },
      };
      setTimeout(() => {
        publish(Topics.MicrofrontStarted, widgetData, {
          source: 'widget-a',
          version: '1.0.0',
          correlationId: crypto.randomUUID(),
        });
      }, 100);
    }
  }

  private watchBusEvents() {
    console.log('Setting up event listeners in Widget A...');
    onTopic<MicrofrontsStatePayload>(Topics.MicrofrontStarted)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({payload}: any) => {
        console.log('Nueva notificación recibida en Widget A:', payload);
        this.loadComponentBasedOnState(payload.state, payload.data);
      });
  }

  private loadComponentBasedOnState(state: MicrofrontsState, data?: any): void {
    if (!this.dynamicHost) {
      console.warn('Dynamic host not available yet');
      return;
    }

    if (state == MicrofrontsState.PageComplete) {
      this.dynamicRenderService.loadComponent(this.dynamicHost, PageComplete, data);
    } else if (state == MicrofrontsState.HomeCard) {
      this.dynamicRenderService.loadComponent(this.dynamicHost, HomeCard, data);
    }  else if (state == MicrofrontsState.ControlPanel) {
      this.dynamicRenderService.loadComponent(this.dynamicHost, ControlPanel, data);
    } else {
      console.log(`No component mapped for state: ${state}`);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
