import { Component } from '@angular/core';

interface Stat {
  /** Clé de l'icône SVG rendue dans le template. */
  key: 'tailored' | 'services' | 'support' | 'global';
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly stats: Stat[] = [
    { key: 'tailored', value: 'Sur mesure', label: 'Selon vos objectifs' },
    { key: 'services', value: 'Multi-services', label: 'Un seul interlocuteur' },
    { key: 'support', value: 'À vos côtés', label: 'Du brief à la livraison' },
    { key: 'global', value: 'International', label: 'Tunisie, France et ailleurs' },
  ];
}
