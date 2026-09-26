import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title:
      'Subham Sourabh — Lead Software Engineer | Angular | React | Node.js | Java | Agentic AI',
    loadComponent: () =>
      import('./portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
