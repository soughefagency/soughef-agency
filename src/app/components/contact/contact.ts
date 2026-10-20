import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SITE_CONFIG } from '../../site.config';
import { ContactMessage, ContactService, ContactStatus } from '../../services/contact.service';
import { SocialLinks } from '../social-links/social-links';

type RequiredField = 'name' | 'email' | 'message';

/** Refuse les valeurs composées uniquement d'espaces. */
function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return typeof value === 'string' && value.trim().length > 0 ? null : { notBlank: true };
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, SocialLinks],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly contactService = inject(ContactService);

  protected readonly config = SITE_CONFIG;

  protected readonly serviceOptions = [
    'Création de site web',
    'Marketing digital',
    'Montage vidéo',
    'Design & branding',
    'Maintenance & support',
    'Autre demande',
  ];

  protected readonly budgetOptions = [
    'À définir',
    'Moins de 1 000 DT',
    '1 000–3 000 DT',
    '3 000–6 000 DT',
    'Plus de 6 000 DT',
    'Budget en euros à définir',
  ];

  protected readonly form = this.fb.group({
    name: ['', notBlank],
    email: ['', [notBlank, Validators.email]],
    service: ['Création de site web'],
    budget: ['À définir'],
    message: ['', [notBlank, Validators.minLength(10)]],
  });

  /** Vrai dès la première tentative d'envoi : déclenche l'affichage des erreurs. */
  protected readonly submitted = signal(false);
  protected readonly sending = signal(false);
  protected readonly status = signal<'idle' | ContactStatus>('idle');

  protected readonly note = computed(() => {
    switch (this.status()) {
      case 'draft-opened':
        return `Votre demande est prête dans votre application e-mail. Si elle ne s'ouvre pas, écrivez-nous à ${this.config.email}.`;
      case 'error':
        return `L'ouverture de votre messagerie a échoué. Écrivez-nous directement à ${this.config.email}.`;
      default:
        return "Aucune donnée n'est transmise à un serveur : votre demande s'ouvre dans votre application e-mail.";
    }
  });

  protected async submit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.focusFirstInvalid();
      return;
    }

    this.sending.set(true);
    this.status.set('idle');

    const message = this.normalizedMessage();
    this.form.patchValue(message);

    this.status.set(await this.contactService.send(message));
    this.sending.set(false);
  }

  /** Indique si l'erreur d'un champ doit être visible. */
  protected showError(field: RequiredField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected errorMessage(field: RequiredField): string {
    if (!this.showError(field)) {
      return '';
    }

    const control = this.form.controls[field];

    if (control.hasError('notBlank')) {
      return field === 'message' ? 'Merci de décrire votre projet.' : 'Ce champ est obligatoire.';
    }
    if (control.hasError('email')) {
      return 'Adresse e-mail invalide (exemple : vous@exemple.com).';
    }
    if (control.hasError('minlength')) {
      return 'Encore quelques mots pour bien cerner votre besoin.';
    }

    return 'Ce champ est invalide.';
  }

  private normalizedMessage(): ContactMessage {
    const value = this.form.getRawValue();

    return {
      name: value.name.trim(),
      email: value.email.trim(),
      service: value.service,
      budget: value.budget,
      message: value.message.trim(),
    };
  }

  private focusFirstInvalid(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const invalid = (['name', 'email', 'message'] as const).find(
      (field) => this.form.controls[field].invalid,
    );

    if (invalid) {
      this.document.getElementById(invalid)?.focus();
    }
  }
}
