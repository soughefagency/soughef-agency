import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  protected readonly config = SITE_CONFIG;
}
