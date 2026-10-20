import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

/**
 * Lecteur vidéo plein écran (modale).
 *
 * S'ouvre au clic sur une carte de démonstration, gère le focus,
 * la fermeture (Échap, bouton, fond) et le défilement de la page.
 */
@Component({
  selector: 'app-player-video',
  templateUrl: './player-video.html',
  styleUrl: './player-video.scss',
  host: {
    '(document:keydown.escape)': 'close()',
    '(keydown)': 'trapFocus($event)',
  },
})
export class PlayerVideo implements OnDestroy {
  /** Chemin de la vidéo (dossier public/). */
  readonly video = input.required<string>();
  readonly title = input.required<string>();
  readonly tag = input('');

  readonly closed = output<void>();

  private readonly document = inject(DOCUMENT);
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');
  private readonly videoEl = viewChild.required<ElementRef<HTMLVideoElement>>('videoPlayer');

  /** Élément qui a ouvert la modale : récupère le focus à la fermeture. */
  private trigger: HTMLElement | null = null;
  private previousOverflow = '';

  constructor() {
    const active = this.document.activeElement;
    this.trigger = active instanceof HTMLElement ? active : null;
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';

    afterNextRender(() => {
      this.closeButton().nativeElement.focus();
      this.videoEl()
        .nativeElement.play()
        .catch(() => {});
    });
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = this.previousOverflow;
    this.trigger?.focus();
  }

  protected close(): void {
    this.closed.emit();
  }

  /** Boucle le focus sur les éléments interactifs de la modale. */
  protected trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const focusables = Array.from(
      this.hostRef.nativeElement.querySelectorAll<HTMLElement>(
        'button, video[controls], [href], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
