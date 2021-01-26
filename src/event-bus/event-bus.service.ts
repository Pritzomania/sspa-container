import { Subject, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

export class EventBusService {
  private subject$: Subject<any>;
  constructor() {
    this.subject$ = new Subject();
  }

  emit(event) {
    this.subject$.next(event);
  }

  on(eventName, action) {
    return this.subject$
      .pipe(
        filter((e) => e.name === eventName),
        map((e) => e["data"])
      )
      .subscribe(action);
  }
}
