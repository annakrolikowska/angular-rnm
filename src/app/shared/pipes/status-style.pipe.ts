import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusStyle' })
export class StatusStylePipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'Alive':
        return 'rgba(173, 255, 49, 90%)';
      case 'Dead':
        return 'rgb(215 83 83 / 90%)';
      default:
        return 'rgb(208 209 207 / 90%)';
    }
  }
}
