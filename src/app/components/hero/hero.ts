import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly domains = [
    'Sites web',
    'Marketing digital',
    'Montage vidéo',
    'Design & branding',
    'Solutions sur mesure',
  ];
}
