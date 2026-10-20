import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';
import { I18nService } from '../../i18n/i18n.service';
import { Dict } from '../../i18n/translations';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-site-header',
  imports: [LanguageSwitcher],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader implements OnDestroy {
  protected readonly config = SITE_CONFIG;

  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);

  /** Dictionnaire courant (réactif) — à lire dans le template : `t().nav.home`. */
  protected readonly t = this.i18n.t;

  protected readonly menuOpen = signal(false);

  /** Id de la section actuellement visible (sans le #), pour surligner le lien. */
  protected readonly activeId = signal('accueil');

  private observer?: IntersectionObserver;

  /** Ids des sections croisant actuellement la bande sous le header. */
  private readonly visible = new Set<string>();

  // Ordre aligné sur l'ordre des sections dans la page (home.html).
  protected readonly links: { href: string; key: keyof Dict['nav'] }[] = [
    { href: '#accueil', key: 'home' },
    { href: '#services', key: 'services' },
    { href: '#apropos', key: 'about' },
    { href: '#portfolio', key: 'portfolio' },
    { href: '#demos', key: 'demos' },
    // Témoignages : à réactiver plus tard
    { href: '#contact', key: 'contact' },
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

  /** Surligne le lien dont la section occupe la zone juste sous le header. */
  private observeSections(): void {
    const header = this.readHeaderHeight();
    const order = this.links.map((link) => link.href.slice(1));

    this.observer = new IntersectionObserver(
      (entries) => {
        // Met à jour l'ensemble des sections visibles dans la bande.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visible.add(entry.target.id);
          } else {
            this.visible.delete(entry.target.id);
          }
        }

        // La section active est la plus haute (ordre du document) encore visible :
        // c'est celle qui occupe la zone immédiatement sous le header. En choisir
        // une seule évite les sauts dus à l'ordre arbitraire des `entries`.
        const current = order.find((id) => this.visible.has(id));
        if (current) {
          this.activeId.set(current);
        }
      },
      {
        // Bande d'observation : du bas du header jusqu'à ~40% de la fenêtre.
        rootMargin: `-${header}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    for (const id of order) {
      const section = this.document.getElementById(id);
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
