import { Subject } from 'rxjs/Subject';

export class UIService {
  loadingState = new Subject<boolean>();
}
