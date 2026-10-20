import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

type IconKey = 'tailored' | 'services' | 'support' | 'global';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  /** Clés d'icônes (non traduisibles) alignées sur l'ordre des engagements. */
  private readonly keys: IconKey[] = ['tailored', 'services', 'support', 'global'];

  protected readonly stats = computed(() =>
    this.t().stats.items.map((item, index) => ({ key: this.keys[index], ...item })),
  );
}
