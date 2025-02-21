import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-emptylist-message',
  templateUrl: './emptylist-message.component.html',
  styleUrl: './emptylist-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptylistMessageComponent {}
