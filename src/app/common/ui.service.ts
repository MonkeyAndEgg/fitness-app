import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
  loadingState = new Subject<boolean>();

  constructor(private snackBarService: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this.snackBarService.open(message, action, {
      duration: duration
    });
  }
}
