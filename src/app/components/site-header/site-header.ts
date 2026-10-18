import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#demos', label: 'Démos de sites web' },
    { href: '#apropos', label: 'À propos' },
    { href: '#temoignages', label: 'Témoignages' },
    { href: '#contact', label: 'Contact' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
