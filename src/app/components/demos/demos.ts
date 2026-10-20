import { Component, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { PlayerVideo } from '../player-video/player-video';

interface Demo {
  video: string;
  ariaLabel: string;
  tag: string;
  title: string;
  description: string;
  file: string;
}

/** Nombre de cartes visibles selon la largeur d'écran. */
const RESPONSIVE_SIZES: { query: string; size: number }[] = [
  { query: '(max-width: 720px)', size: 1 },
  { query: '(max-width: 980px)', size: 2 },
];

@Component({
  selector: 'app-demos',
  imports: [PlayerVideo],
  templateUrl: './demos.html',
  styleUrl: './demos.scss',
})
export class Demos {
  private readonly platformId = inject(PLATFORM_ID);

  /** Démo ouverte dans la modale lecteur. */
  protected readonly activeDemo = signal<Demo | null>(null);

  /** Durées réelles lues depuis les métadonnées vidéo. */
  protected readonly durations = signal<Record<string, string>>({});

  /** Cartes par écran + page courante du carrousel. */
  protected readonly pageSize = signal(3);
  protected readonly page = signal(0);
  protected readonly pageCount = computed(() => Math.ceil(this.demos.length / this.pageSize()));

  protected readonly visibleDemos = computed(() => {
    const start = this.page() * this.pageSize();
    return this.demos.slice(start, start + this.pageSize());
  });

  protected readonly canPrev = computed(() => this.page() > 0);
  protected readonly canNext = computed(() => this.page() + 1 < this.pageCount());

  /** Indices des pages, pour les pastilles de navigation. */
  protected readonly pageCountArray = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => index),
  );

  /** Vidéos démarrées par le survol : relâchées à la sortie de la souris. */
  private readonly hoverStarted = new WeakSet<HTMLVideoElement>();

  protected readonly demos: Demo[] = [
    {
      video: 'videos/demo-site-restaurant.mp4',
      ariaLabel: 'Démonstration du site web de restaurant',
      tag: 'Restauration',
      title: 'Site web de restaurant',
      description: 'Présentation du restaurant, mise en valeur du menu et parcours de réservation.',
      file: 'Démo vidéo · Site responsive',
    },
    {
      video: 'videos/demo-site-ecommerce.mp4',
      ariaLabel: 'Démonstration du site e-commerce',
      tag: 'Commerce en ligne',
      title: 'Site e-commerce',
      description:
        "Présentation des produits, catégories et parcours d'achat d'une boutique en ligne.",
      file: 'Démo vidéo · Boutique en ligne',
    },
    {
      video: 'videos/demo-site-immobilier.mp4',
      ariaLabel: "Démonstration d'un site immobilier",
      tag: 'Immobilier',
      title: 'Site web immobilier',
      description: 'Vitrine de biens, fiches de propriétés et expérience de recherche simplifiée.',
      file: 'Démo vidéo · Catalogue de biens',
    },
    {
      video: 'videos/demo-site-sante.mp4',
      ariaLabel: "Démonstration d'un site de cabinet médical",
      tag: 'Santé',
      title: 'Site cabinet médical',
      description: "Présentation de l'équipe, spécialités et prise de rendez-vous en ligne.",
      file: 'Démo vidéo · Prise de rendez-vous',
    },
    {
      video: 'videos/demo-site-voyage.mp4',
      ariaLabel: "Démonstration d'un site d'agence de voyage",
      tag: 'Voyage',
      title: 'Site agence de voyage',
      description: 'Offres de séjours, destinations phares et réservation d’itinéraires.',
      file: 'Démo vidéo · Réservation de séjours',
    },
    {
      video: 'videos/demo-site-mode.mp4',
      ariaLabel: "Démonstration d'une boutique de mode",
      tag: 'Mode',
      title: 'Site de marque mode',
      description: 'Collections saisonnières, lookbooks et expérience mobile-first.',
      file: 'Démo vidéo · Collections en ligne',
    },
  ];

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.syncPageSize();

    window.addEventListener('resize', () => this.syncPageSize());
  }

  /** Ouvre la vidéo sélectionnée dans la modale lecteur. */
  protected open(demo: Demo): void {
    this.activeDemo.set(demo);
  }

  protected closePlayer(): void {
    this.activeDemo.set(null);
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

  protected onLoadedMetadata(demo: Demo, event: Event): void {
    const video = event.target as HTMLVideoElement;

    if (!Number.isFinite(video.duration)) {
      return;
    }

    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.round(video.duration % 60);
    const label = `${minutes}:${String(seconds).padStart(2, '0')}`;

    this.durations.update((current) => ({ ...current, [demo.title]: label }));
  }

  /** Lecture muette au survol : désactivée sur tactile et en mouvement réduit. */
  protected onHoverStart(event: Event): void {
    const video = this.videoOf(event);
    if (!video || !this.canHoverPreview()) {
      return;
    }

    video.muted = true;
    video
      .play()
      .then(() => this.hoverStarted.add(video))
      .catch(() => {});
  }

  protected onHoverStop(event: Event): void {
    const video = this.videoOf(event);
    if (!video || !this.hoverStarted.has(video)) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    video.muted = false;
    this.hoverStarted.delete(video);
  }

  private syncPageSize(): void {
    const match = RESPONSIVE_SIZES.find((entry) => window.matchMedia(entry.query).matches);
    const size = match?.size ?? 3;

    this.pageSize.set(size);
    this.page.update((current) =>
      Math.min(current, Math.max(0, Math.ceil(this.demos.length / size) - 1)),
    );
  }

  private videoOf(event: Event): HTMLVideoElement | null {
    const wrapper = (event.currentTarget as HTMLElement | null)?.closest('.demo-video');
    return wrapper?.querySelector('video') ?? null;
  }

  private canHoverPreview(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
