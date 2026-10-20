import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { SITE_CONFIG } from '../site.config';

/** Contenu du formulaire de contact. */
export interface ContactMessage {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

/** Résultat de l'envoi d'un message. */
export type ContactStatus = 'draft-opened' | 'unsupported' | 'error';

/**
 * Envoi des demandes de contact.
 *
 * Implémentation actuelle : ouverture d'un brouillon dans l'application e-mail
 * du visiteur (aucun serveur, aucun secret). Pour brancher un vrai envoi
 * (API, SMTP, service tiers), remplacez le corps de `send()` par un appel
 * HttpClient — le composant Contact n'a pas à changer.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  async send(message: ContactMessage): Promise<ContactStatus> {
    if (!isPlatformBrowser(this.platformId)) {
      return 'unsupported';
    }

    try {
      this.openMailDraft(message);
      return 'draft-opened';
    } catch {
      return 'error';
    }
  }

  /** Ouvre le client e-mail avec la demande préremplie. */
  private openMailDraft(message: ContactMessage): void {
    const subject = encodeURIComponent(`Demande de devis — ${SITE_CONFIG.brand.fullName}`);
    const body = encodeURIComponent(
      [
        `Nom : ${message.name}`,
        `E-mail : ${message.email}`,
        `Service : ${message.service}`,
        `Budget : ${message.budget}`,
        '',
        'Projet :',
        message.message,
      ].join('\n'),
    );

    this.document.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  }
}
