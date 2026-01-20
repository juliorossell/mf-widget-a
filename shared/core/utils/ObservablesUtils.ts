import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export class ObservableUtils {

    static createMockObservable<T>(mock: any): Observable<T> {
      const observable = new Observable<T>((observer: any) => {
      setTimeout(() => {
            const httpResponse = new HttpResponse({ body: mock });
            observer.next(httpResponse.body);
            observer.complete();
          }, 500);
        });
        return observable;
    }

}