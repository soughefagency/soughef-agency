import { Component } from '@angular/core';

import { SiteHeader } from '../../components/site-header/site-header';
import { Hero } from '../../components/hero/hero';
import { Services } from '../../components/services/services';
import { About } from '../../components/about/about';
import { Portfolio } from '../../components/portfolio/portfolio';
import { Demos } from '../../components/demos/demos';
import { Stats } from '../../components/stats/stats';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Contact } from '../../components/contact/contact';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { BackTop } from '../../components/back-top/back-top';

@Component({
  selector: 'app-home',
  imports: [
    SiteHeader,
    Hero,
    Services,
    About,
    Portfolio,
    Demos,
    Stats,
    Testimonials,
    Contact,
    SiteFooter,
    BackTop,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
