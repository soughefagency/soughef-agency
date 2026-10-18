import { Component } from '@angular/core';

interface Stat {
  icon: string;
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
    { icon: '♙', value: 'Sur mesure', label: 'Selon vos objectifs' },
    { icon: '▣', value: 'Multi-services', label: 'Un seul interlocuteur' },
    { icon: '◷', value: 'À vos côtés', label: 'Du brief à la livraison' },
    { icon: '◎', value: 'International', label: 'Tunisie, France et ailleurs' },
  ];
}
