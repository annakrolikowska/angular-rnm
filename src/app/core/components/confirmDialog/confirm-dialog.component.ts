import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div mat-dialog-content>Are you sure you want to delete this item?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()" appTransparentBg>Cancel</button>
      <button mat-button (click)="onConfirm()">Delete</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
