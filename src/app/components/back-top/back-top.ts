import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.html',
  styleUrl: './back-top.scss',
})
export class BackTop {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected scrollTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
