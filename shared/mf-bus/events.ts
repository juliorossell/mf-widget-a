export const Topics = {
  UiToast: 'ui:toast',
  RouteRequest: 'layout:routeRequest',
  AuthTokenChanged: 'auth:tokenChanged',
  PaymentsStatusChanged: 'payments:statusChanged',
  NotificationsEnqueue: 'notifications:enqueue',
  MicrofrontStarted: 'microfront:started',
} as const;

export enum MicrofrontsState {
  PageComplete = 'PAGE_COMPLETE',
  HomeCard = 'HOME_CARD',
  ControlPanel = 'CONTROL_PANEL',
  Loading = 'LOADING',
  Error = 'ERROR',
}

export type UiToastPayload = { kind: 'success' | 'info' | 'error'; message: string };
export type RouteRequestPayload = { path: string };
export type AuthTokenChangedPayload = { token: string | null };
export type MicrofrontsStatePayload = { state: MicrofrontsState, data?: any };

export type PaymentStatus = 'PROCESSING' | 'SUCCESS' | 'FAILED';

export type PaymentStatusChanged = {
  payment_id: number;
  payment_amount: number;
  currency: 'PEN' | 'USD';
  status: PaymentStatus;
  client: { name: string };
};

export type NotificationItem = {
  id: string; // correlationId o generado
  kind: 'info' | 'success' | 'error';
  title: string;
  message: string;
  imageKey?: 'payment' | 'warning' | 'check';
  createdAt: number;
  data?: unknown; // opcional para deep-link
};
