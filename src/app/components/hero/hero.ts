import { Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly config = SITE_CONFIG;

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
}
