import { Component } from '@angular/core';

interface Project {
  image: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  protected readonly projects: Project[] = [
    {
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      alt: 'Ambiance de restaurant',
      tag: 'Développement web',
      title: 'Site vitrine — Restaurant',
      description: 'Un site élégant pour présenter un établissement, son menu et ses coordonnées.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
      alt: 'Design graphique et supports de communication',
      tag: 'Marketing digital',
      title: 'Campagne pour les réseaux sociaux',
      description: "Une direction visuelle cohérente pour renforcer la présence d'une marque.",
    },
    {
      image:
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
      alt: 'Équipement de production vidéo',
      tag: 'Production vidéo',
      title: 'Vidéo promotionnelle',
      description: 'Un format vidéo dynamique conçu pour présenter un produit ou un service.',
    },
  ];
}
