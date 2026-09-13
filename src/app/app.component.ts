import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Replace these sample details with your own before publishing.
  name = 'Alex Morgan';
  email = 'hello@example.com';
  filter = 'All work';
  filters = ['All work', 'Development', 'UI / UX'];
  projects = [
    { name: 'Orbit', category: 'Development', type: 'Dashboard · Web application', style: 'orbit', headline: 'A little clarity. A lot of possibility.', description: 'A concept analytics workspace that brings key metrics, activity, and team insights into one focused interface.', stack: 'Angular / TypeScript / SCSS' },
    { name: 'Forma', category: 'UI / UX', type: 'Brand experience · E-commerce', style: 'forma', headline: 'Objects for a slower life.', description: 'A concept storefront for thoughtfully made furniture, exploring editorial layouts, natural colors, and an intuitive shopping experience.', stack: 'UI design / Design systems / Prototyping' },
    { name: 'Offscript', category: 'Development', type: 'Editorial · Digital experience', style: 'offscript', headline: 'Good stories live here.', description: 'A concept publication designed around readable typography, expressive imagery, and effortless content discovery.', stack: 'Angular / Responsive design / Accessibility' }
  ];
  get visibleProjects() { return this.projects.filter(p => this.filter === 'All work' || p.category === this.filter); }
}
