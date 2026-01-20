import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicRenderComponentService {
  containerRef: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(container: any, component: any, data?: any) {
    setTimeout(() => {
      if (container) {
        const componentFactory =
          this.componentFactoryResolver.resolveComponentFactory(component);
        const viewContainerRef = container.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (componentRef.instance as any).data = data;
      }
    }, 1);
  }
}
