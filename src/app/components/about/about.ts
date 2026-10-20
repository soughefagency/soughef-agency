import { Component, computed, inject } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly config = SITE_CONFIG;

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  /** Illustration de la section : remplaçable par un fichier de public/. */
  protected readonly workspaceImage =
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

  /** Icônes (non traduisibles) alignées sur l'ordre des valeurs du dictionnaire. */
  private readonly icons = ['⌘', '✧', '♧', '↗'];

  protected readonly values = computed(() =>
    this.t().about.values.map((value, index) => ({ icon: this.icons[index], ...value })),
  );
}
