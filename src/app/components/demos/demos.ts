import { Component } from '@angular/core';

interface Demo {
  video: string;
  poster: string;
  ariaLabel: string;
  tag: string;
  title: string;
  description: string;
  file: string;
}

@Component({
  selector: 'app-demos',
  templateUrl: './demos.html',
  styleUrl: './demos.scss',
})
export class Demos {
  protected readonly demos: Demo[] = [
    {
      video: 'videos/demo-site-restaurant.mp4',
      poster:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
      ariaLabel: 'Démonstration du site web de restaurant',
      tag: 'Restauration',
      title: 'Site web de restaurant',
      description: 'Présentation du restaurant, mise en valeur du menu et parcours de réservation.',
      file: 'Démo vidéo · Site responsive',
    },
    {
      video: 'videos/demo-site-ecommerce.mp4',
      poster:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85',
      ariaLabel: 'Démonstration du site e-commerce',
      tag: 'Commerce en ligne',
      title: 'Site e-commerce',
      description:
        "Présentation des produits, catégories et parcours d'achat d'une boutique en ligne.",
      file: 'Démo vidéo · Boutique en ligne',
    },
    {
      video: 'videos/demo-site-immobilier.mp4',
      poster:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      ariaLabel: "Démonstration d'un site immobilier",
      tag: 'Immobilier',
      title: 'Site web immobilier',
      description: 'Vitrine de biens, fiches de propriétés et expérience de recherche simplifiée.',
      file: 'Démo vidéo · Catalogue de biens',
    },
  ];
}
