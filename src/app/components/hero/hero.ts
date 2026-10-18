import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly config = SITE_CONFIG;
  protected readonly domains = [
    'Sites web',
    'Marketing digital',
    'Montage vidéo',
    'Design & branding',
    'Solutions sur mesure',
  ];
}
