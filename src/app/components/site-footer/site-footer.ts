import { Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';
import { SocialLinks } from '../social-links/social-links';

@Component({
  selector: 'app-site-footer',
  imports: [SocialLinks],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly config = SITE_CONFIG;

  protected readonly year = signal(new Date().getFullYear());

  protected readonly links = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#demos', label: 'Démos de sites web' },
    { href: '#apropos', label: 'À propos' },
    { href: '#contact', label: 'Contact' },
  ];
}
