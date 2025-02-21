import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'genderStyle' })
export class GenderStylePipe implements PipeTransform {
  transform(gender: string): string {
    switch (gender) {
      case 'Male':
        return '#A0D5E7';
      case 'Female':
        return '#E693CF';
      default:
        return 'transparent';
    }
  }
}
