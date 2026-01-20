import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BmsMicroService } from '../../services/bms-micro-service';

// Import Fractalia components
import { FraButtonComponent } from '@fractalia/components';

// Import JWT interceptor
import { provideJwtInterceptor } from '../../../../shared/interceptors';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, FraButtonComponent],
  providers: [
    ...provideJwtInterceptor(),
    BmsMicroService
  ],
  templateUrl: './control-panel.html',
  styleUrls: ['./control-panel.scss'],
})
export class ControlPanel implements OnInit {
  isloading: boolean = false;

  constructor(private bitdefendermspService: BmsMicroService) {}

  ngOnInit(): void {
    this.simulateLoadControlPanelAPI();
  }

  simulateLoadControlPanelAPI() {
    this.isloading = true;

    this.bitdefendermspService
      .getUserLicenceMspObservable()
      .pipe(
        tap((data: any) => {
          console.log('✅ API call successful! Data received:', data);
          console.log('🔒 JWT token was automatically included by interceptor');
        }),
        tap(() => (this.isloading = false)),
        catchError((error) => {
          console.error('❌ API call failed:', error);
          console.log('🔍 Check if JWT interceptor logs appeared above');
          this.isloading = false;
          return of(null); // Return empty observable to prevent error propagation
        })
      )
      .subscribe({
        next: (data) => {
          if (data !== null) {
            console.log('🎉 Final success - API call completed with JWT interceptor');
          } else {
            console.log('⚠️ API call returned null (error was handled)');
          }
        },
        error: (error) => {
          console.error('🚨 Subscription error:', error);
          this.isloading = false;
        },
      });
  }
}
