import { Component, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';
import { I18nService } from '../../i18n/i18n.service';
import { Dict } from '../../i18n/translations';
import { SocialLinks } from '../social-links/social-links';

@Component({
  selector: 'app-site-footer',
  imports: [SocialLinks],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly config = SITE_CONFIG;

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected readonly year = signal(new Date().getFullYear());

  // Ordre aligné sur l'ordre des sections dans la page (home.html).
  protected readonly links: { href: string; key: keyof Dict['nav'] }[] = [
    { href: '#accueil', key: 'home' },
    { href: '#services', key: 'services' },
    { href: '#apropos', key: 'about' },
    { href: '#portfolio', key: 'portfolio' },
    { href: '#demos', key: 'demos' },
    { href: '#contact', key: 'contact' },
  ];
}
