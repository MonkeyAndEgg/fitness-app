import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {

  constructor(private snackBarService: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this.snackBarService.open(message, action, {
      duration: duration
    });
  }
}
