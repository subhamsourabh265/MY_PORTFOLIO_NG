import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Subham Sourabh — Lead Frontend Engineer | Angular',
    loadComponent: () =>
      import('./portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
