import { Component, ElementRef, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { Lang } from '../../i18n/translations';
import { FlagIcon } from '../flag-icon/flag-icon';

@Component({
  selector: 'app-language-switcher',
  imports: [FlagIcon],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'close()',
  },
})
export class LanguageSwitcher {
  protected readonly i18n = inject(I18nService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected choose(code: Lang): void {
    this.i18n.setLang(code);
    this.close();
  }

  /** Ferme le menu au clic en dehors du composant. */
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
