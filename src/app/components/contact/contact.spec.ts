import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { ContactMessage, ContactService, ContactStatus } from '../../services/contact.service';

class ContactServiceStub {
  readonly sent: ContactMessage[] = [];
  status: ContactStatus = 'draft-opened';

  async send(message: ContactMessage): Promise<ContactStatus> {
    this.sent.push(message);
    return this.status;
  }
}

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let service: ContactServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [{ provide: ContactService, useClass: ContactServiceStub }],
    }).compileComponents();

    service = TestBed.inject(ContactService) as unknown as ContactServiceStub;
    fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
  });

  function field(id: string): HTMLInputElement {
    return fixture.nativeElement.querySelector(`#${id}`) as HTMLInputElement;
  }

  function type(id: string, value: string): void {
    const element = field(id);
    element.value = value;
    element.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  async function submit(): Promise<void> {
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('affiche les erreurs et bloque l’envoi si le formulaire est vide', async () => {
    await submit();

    expect(service.sent).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('#name-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#message-error')).toBeTruthy();
    expect(field('name').getAttribute('aria-invalid')).toBe('true');
  });

  it('refuse une adresse e-mail invalide', async () => {
    type('name', 'Sara');
    type('email', 'pas-un-email');
    type('message', 'Je souhaite un site vitrine.');
    await submit();

    expect(service.sent).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('#email-error')?.textContent).toContain(
      'Adresse e-mail invalide',
    );
  });

  it('refuse un champ rempli uniquement d’espaces', async () => {
    type('name', '   ');
    type('email', 'sara@soughef.tn');
    type('message', 'Refonte du site vitrine.');
    await submit();

    expect(service.sent).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('#name-error')).toBeTruthy();
  });

  it('envoie une demande nettoyée et confirme la préparation du brouillon', async () => {
    type('name', '  Sara  ');
    type('email', '  sara@soughef.tn  ');
    type('message', '  Refonte complète du site vitrine.  ');
    await submit();

    expect(service.sent).toEqual([
      {
        name: 'Sara',
        email: 'sara@soughef.tn',
        service: 'Création de site web',
        budget: 'À définir',
        message: 'Refonte complète du site vitrine.',
      },
    ]);

    const note = fixture.nativeElement.querySelector('.form-note') as HTMLElement;
    expect(note.textContent).toContain('prête');
    expect(note.classList.contains('is-success')).toBe(true);
  });

  it('signale l’échec de l’ouverture de la messagerie', async () => {
    service.status = 'error';
    type('name', 'Sara');
    type('email', 'sara@soughef.tn');
    type('message', 'Refonte complète du site vitrine.');
    await submit();

    const note = fixture.nativeElement.querySelector('.form-note') as HTMLElement;
    expect(note.textContent).toContain('échoué');
    expect(note.classList.contains('is-error')).toBe(true);
  });
});
