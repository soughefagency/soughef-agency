import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  /** Icônes (non traduisibles) alignées sur l'ordre des services du dictionnaire. */
  private readonly icons = ['⌘', '↗', '▷', '✳', '⚙', '▥'];

  protected readonly services = computed(() =>
    this.t().services.items.map((item, index) => ({ icon: this.icons[index], ...item })),
  );
}
