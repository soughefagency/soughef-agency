import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

const CONTACT_EMAIL = 'contact@sougheforganization.com';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly email = CONTACT_EMAIL;

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

  protected readonly formNote = signal(
    "Le formulaire ouvrira votre application e-mail avec votre demande préremplie. Aucun message n'est envoyé automatiquement depuis ce site.",
  );

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    service: ['Création de site web'],
    budget: ['À définir'],
    message: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, service, budget, message } = this.form.getRawValue();
    const subject = encodeURIComponent('Demande de devis — SOUGHEF ORGANIZATION');
    const body = encodeURIComponent(
      `Nom : ${name}\nE-mail : ${email}\nService : ${service}\nBudget : ${budget}\n\nProjet :\n${message}`,
    );

    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }

    this.formNote.set(
      "Si votre application e-mail ne s'est pas ouverte, vérifiez votre configuration ou contactez-nous directement.",
    );
  }
}
