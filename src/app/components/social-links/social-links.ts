import { Component, input } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
})
export class SocialLinks {
  protected readonly socials = [
    { key: 'facebook', label: 'Facebook', url: SITE_CONFIG.socials.facebook },
    { key: 'instagram', label: 'Instagram', url: SITE_CONFIG.socials.instagram },
    { key: 'tiktok', label: 'TikTok', url: SITE_CONFIG.socials.tiktok },
    { key: 'gmail', label: 'E-mail', url: `mailto:${SITE_CONFIG.email}` },
  ] as const;

  /** Taille des boutons (px). */
  readonly size = input(44);
}
