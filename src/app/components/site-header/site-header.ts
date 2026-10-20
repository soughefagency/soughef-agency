import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader implements OnDestroy {
  protected readonly config = SITE_CONFIG;

  private readonly document = inject(DOCUMENT);

  protected readonly menuOpen = signal(false);

  /** Id de la section actuellement visible (sans le #), pour surligner le lien. */
  protected readonly activeId = signal('accueil');

  private observer?: IntersectionObserver;

  // Ordre aligné sur l'ordre des sections dans la page (home.html).
  protected readonly links = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#apropos', label: 'À propos' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#demos', label: 'Démos de sites web' },
    // Témoignages : à réactiver plus tard
    // { href: '#temoignages', label: 'Témoignages' },
    { href: '#contact', label: 'Contact' },
  ];

  constructor() {
    // afterNextRender ne s'exécute que côté navigateur : pas de garde SSR nécessaire.
    afterNextRender(() => this.observeSections());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected isActive(href: string): boolean {
    return href.slice(1) === this.activeId();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Surligne le lien dont la section est dans la bande juste sous le header. */
  private observeSections(): void {
    const header = this.readHeaderHeight();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeId.set(entry.target.id);
          }
        }
      },
      {
        // Zone active : du bas du header jusqu'à ~30% de la hauteur de la fenêtre.
        rootMargin: `-${header}px 0px -70% 0px`,
        threshold: 0,
      },
    );

    for (const link of this.links) {
      const section = this.document.getElementById(link.href.slice(1));
      if (section) {
        this.observer.observe(section);
      }
    }
  }

  private readHeaderHeight(): number {
    const raw = getComputedStyle(this.document.documentElement).getPropertyValue('--header-height');
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) ? parsed : 80;
  }
}
