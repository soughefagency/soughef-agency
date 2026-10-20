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
import { I18nService } from '../../i18n/i18n.service';
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
  private readonly i18n = inject(I18nService);

  protected readonly config = SITE_CONFIG;
  protected readonly t = this.i18n.t;

  // Les selects stockent l'INDEX de l'option (chaîne) : robuste au changement de
  // langue (la sélection reste valide, seuls les libellés affichés changent).
  protected readonly form = this.fb.group({
    name: ['', notBlank],
    email: ['', [notBlank, Validators.email]],
    service: ['0'],
    budget: ['0'],
    message: ['', [notBlank, Validators.minLength(10)]],
  });

  /** Vrai dès la première tentative d'envoi : déclenche l'affichage des erreurs. */
  protected readonly submitted = signal(false);
  protected readonly sending = signal(false);
  protected readonly status = signal<'idle' | ContactStatus>('idle');

  protected readonly note = computed(() => {
    const notes = this.t().contact.notes;
    const email = this.config.email;
    switch (this.status()) {
      case 'draft-opened':
        return notes.draftOpened.replace('{email}', email);
      case 'error':
        return notes.error.replace('{email}', email);
      default:
        return notes.idle;
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
    // Reflète les champs texte nettoyés (sans toucher aux selects stockés par index).
    this.form.patchValue({ name: message.name, email: message.email, message: message.message });

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
    const errors = this.t().contact.errors;

    if (control.hasError('notBlank')) {
      return field === 'message' ? errors.messageRequired : errors.required;
    }
    if (control.hasError('email')) {
      return errors.email;
    }
    if (control.hasError('minlength')) {
      return errors.minlength;
    }

    return errors.invalid;
  }

  private normalizedMessage(): ContactMessage {
    const value = this.form.getRawValue();
    const dict = this.t().contact;

    return {
      name: value.name.trim(),
      email: value.email.trim(),
      service: dict.serviceOptions[Number(value.service)] ?? dict.serviceOptions[0],
      budget: dict.budgetOptions[Number(value.budget)] ?? dict.budgetOptions[0],
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
