import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  image: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
}

/** Nombre de cartes visibles selon la largeur d'écran. */
const RESPONSIVE_SIZES: { query: string; size: number }[] = [
  { query: '(max-width: 720px)', size: 1 },
  { query: '(max-width: 980px)', size: 2 },
];

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  private readonly platformId = inject(PLATFORM_ID);

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

  /** Cartes par écran + page courante du carrousel. */
  protected readonly pageSize = signal(3);
  protected readonly page = signal(0);
  protected readonly pageCount = computed(() => Math.ceil(this.projects.length / this.pageSize()));

  /** Réalisations regroupées par page : toutes rendues côte à côte dans la piste glissante. */
  protected readonly pages = computed(() => {
    const size = this.pageSize();
    const groups: Project[][] = [];
    for (let i = 0; i < this.projects.length; i += size) {
      groups.push(this.projects.slice(i, i + size));
    }
    return groups;
  });

  protected readonly canPrev = computed(() => this.page() > 0);
  protected readonly canNext = computed(() => this.page() + 1 < this.pageCount());

  /** Indices des pages, pour les pastilles de navigation. */
  protected readonly pageCountArray = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => index),
  );

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.syncPageSize();

    window.addEventListener('resize', () => this.syncPageSize());
  }

  protected prev(): void {
    this.page.update((current) => Math.max(0, current - 1));
  }

  protected next(): void {
    this.page.update((current) => Math.min(this.pageCount() - 1, current + 1));
  }

  protected goTo(index: number): void {
    this.page.set(Math.min(Math.max(0, index), this.pageCount() - 1));
  }

  private syncPageSize(): void {
    const match = RESPONSIVE_SIZES.find((entry) => window.matchMedia(entry.query).matches);
    const size = match?.size ?? 3;

    this.pageSize.set(size);
    this.page.update((current) =>
      Math.min(current, Math.max(0, Math.ceil(this.projects.length / size) - 1)),
    );
  }
}
