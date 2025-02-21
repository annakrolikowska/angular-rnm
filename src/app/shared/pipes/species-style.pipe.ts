import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'speciesStyle' })
export class SpeciesStylePipe implements PipeTransform {
  transform(species: string): string {
    switch (species) {
      case 'Human':
        return '#F8DBC8';
      case 'Alien':
        return '#CBE47A';
      case 'Humanoid':
        return '#C4D7C1';
      case 'Robot':
        return '#E1DFD9';
      case 'Mythological Creature':
        return '#FF9999';
      case 'Animal':
        return '#DFC6A1';
      case 'Poopybutthole':
        return '#FCF8A7';
      case 'Disease':
        return '#afbe7d';
      case 'Cronenberg':
        return '#d2b438';
      default:
        return 'transparent';
    }
  }
}
