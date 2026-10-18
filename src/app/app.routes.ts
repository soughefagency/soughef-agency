import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SITE_CONFIG } from './site.config';

export const routes: Routes = [
  { path: '', component: Home, title: `${SITE_CONFIG.brand.fullName} — Agence digitale` },
  { path: '**', redirectTo: '' },
];
