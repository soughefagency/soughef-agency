import { Component, input } from '@angular/core';
import { Lang } from '../../i18n/translations';

/** Petit drapeau SVG par langue (rendu identique sur tous les OS, contrairement aux emoji). */
@Component({
  selector: 'app-flag-icon',
  template: `
    @switch (code()) {
      @case ('fr') {
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" aria-hidden="true">
          <rect width="3" height="2" fill="#fff" />
          <rect width="1" height="2" fill="#0055a4" />
          <rect width="1" height="2" x="2" fill="#ef4135" />
        </svg>
      }
      @case ('en') {
        <svg viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" stroke-width="6" />
          <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" stroke-width="4" />
          <rect x="25" width="10" height="30" fill="#fff" />
          <rect y="10" width="60" height="10" fill="#fff" />
          <rect x="27" width="6" height="30" fill="#c8102e" />
          <rect y="12" width="60" height="6" fill="#c8102e" />
        </svg>
      }
      @case ('ar') {
        <svg viewBox="0 0 24 16" preserveAspectRatio="none" aria-hidden="true">
          <rect width="24" height="16" fill="#e70013" />
          <circle cx="12" cy="8" r="4.6" fill="#fff" />
          <circle cx="12.3" cy="8" r="3.4" fill="#e70013" />
          <circle cx="13.6" cy="8" r="2.8" fill="#fff" />
          <path
            d="M13.9 6.5 l.45 1.1 1.2.08-.9.78.3 1.17-1.05-.63-1.05.63.3-1.17-.9-.78 1.2-.08z"
            fill="#e70013"
          />
        </svg>
      }
      @case ('es') {
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" aria-hidden="true">
          <rect width="3" height="2" fill="#aa151b" />
          <rect width="3" height="1" y="0.5" fill="#f1bf00" />
        </svg>
      }
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }
    svg {
      display: block;
      width: 22px;
      height: 15px;
      border-radius: 3px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
    }
  `,
})
export class FlagIcon {
  readonly code = input.required<Lang>();
}
