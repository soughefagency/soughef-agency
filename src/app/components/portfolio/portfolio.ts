import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { I18nService } from '../../i18n/i18n.service';

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
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  /** Images (non traduisibles) alignées sur l'ordre des réalisations du dictionnaire. */
  private readonly images = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
  ];

  protected readonly projects = computed(() =>
    this.t().portfolio.projects.map((project, index) => ({
      image: this.images[index],
      ...project,
    })),
  );

  /** Cartes par écran + page courante du carrousel. */
  protected readonly pageSize = signal(3);
  protected readonly page = signal(0);
  protected readonly pageCount = computed(() => Math.ceil(this.images.length / this.pageSize()));

  /** Réalisations regroupées par page : toutes rendues côte à côte dans la piste glissante. */
  protected readonly pages = computed(() => {
    const size = this.pageSize();
    const all = this.projects();
    const groups: (typeof all)[] = [];
    for (let i = 0; i < all.length; i += size) {
      groups.push(all.slice(i, i + size));
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
      Math.min(current, Math.max(0, Math.ceil(this.images.length / size) - 1)),
    );
  }
}
