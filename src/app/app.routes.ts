import { Routes } from '@angular/router';
import { Layout } from '@core/layout/layout';
import { Results } from './pages/results/results';
import { AboutMe } from './pages/about-me/about-me';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'results', pathMatch: 'full' },
      { path: 'results', component: Results },
      { path: 'about-me', component: AboutMe },
    ],
  },
];
