import { Component } from '@angular/core';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly services: Service[] = [
    {
      icon: '⌘',
      title: 'Création de sites web',
      description: 'Sites vitrines, e-commerce et applications web adaptés à vos objectifs.',
    },
    {
      icon: '↗',
      title: 'Marketing digital',
      description: 'SEO, publicités en ligne et stratégie de contenu pour toucher vos clients.',
    },
    {
      icon: '▷',
      title: 'Montage vidéo',
      description: 'Reels, vidéos promotionnelles et formats courts pour les réseaux sociaux.',
    },
    {
      icon: '✳',
      title: 'Design & Branding',
      description: 'Identité visuelle, logos et visuels cohérents avec votre marque.',
    },
    {
      icon: '⚙',
      title: 'Maintenance & Support',
      description: 'Mises à jour, sécurité, corrections et optimisation de votre site.',
    },
    {
      icon: '▥',
      title: 'Conseil & Accompagnement',
      description: 'Une stratégie digitale adaptée à vos besoins et à vos objectifs.',
    },
  ];
}
