import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.html',
  styleUrl: './back-top.scss',
})
export class BackTop {
  private readonly platformId = inject(PLATFORM_ID);

  protected scrollTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
