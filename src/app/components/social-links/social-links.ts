import { Component, computed, inject, input } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
})
export class SocialLinks {
  private readonly i18n = inject(I18nService);

  protected readonly socials = computed(() => [
    { key: 'facebook', label: 'Facebook', url: SITE_CONFIG.socials.facebook },
    { key: 'instagram', label: 'Instagram', url: SITE_CONFIG.socials.instagram },
    { key: 'tiktok', label: 'TikTok', url: SITE_CONFIG.socials.tiktok },
    { key: 'gmail', label: this.i18n.t().social.email, url: `mailto:${SITE_CONFIG.email}` },
  ]);

  /** Taille des boutons (px). */
  readonly size = input(44);
}
