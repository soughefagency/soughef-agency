import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Signal, computed, effect, inject, signal } from '@angular/core';
import { Dict, LANGS, Lang, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'soughef-lang';
const DEFAULT_LANG: Lang = 'fr';

/**
 * Service d'internationalisation runtime.
 *
 * - `lang` : langue courante (signal).
 * - `t` : dictionnaire courant (computed) — à lire dans les templates, ex. `t().hero.lead`.
 * - Persiste le choix dans `localStorage` et synchronise `<html lang>` + `dir`
 *   (RTL automatique pour l'arabe). SSR-safe : aucun accès navigateur côté serveur.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly langs = LANGS;

  private readonly _lang = signal<Lang>(DEFAULT_LANG);
  readonly lang: Signal<Lang> = this._lang.asReadonly();

  /** Dictionnaire de la langue courante. */
  readonly t: Signal<Dict> = computed(() => TRANSLATIONS[this._lang()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && saved in TRANSLATIONS) {
        this._lang.set(saved);
      }
    }

    // Applique langue + direction au <html> et persiste à chaque changement.
    effect(() => {
      const code = this._lang();
      const meta = LANGS.find((entry) => entry.code === code) ?? LANGS[0];
      const root = this.document.documentElement;
      root.setAttribute('lang', code);
      root.setAttribute('dir', meta.dir);

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(STORAGE_KEY, code);
      }
    });
  }

  setLang(code: Lang): void {
    if (code in TRANSLATIONS) {
      this._lang.set(code);
    }
  }
}
