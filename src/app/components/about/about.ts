import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

interface Value {
  icon: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly config = SITE_CONFIG;

  /** Illustration de la section : remplaçable par un fichier de public/. */
  protected readonly workspaceImage =
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

  protected readonly values: Value[] = [
    { icon: '⌘', title: 'Expertise technique', subtitle: 'Des solutions adaptées à vos besoins' },
    { icon: '✧', title: 'Créativité', subtitle: 'Une image qui vous ressemble' },
    { icon: '♧', title: 'Accompagnement', subtitle: 'Un interlocuteur à votre écoute' },
    { icon: '↗', title: 'Orientation résultats', subtitle: 'Des objectifs définis ensemble' },
  ];
}
