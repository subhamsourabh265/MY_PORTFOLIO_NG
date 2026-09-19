import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { WorkComponent } from '../work/work.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    WorkComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent,
  ],
  templateUrl: './portfolio.component.html',
  styles: ':host { display: block; }',
})
export class PortfolioComponent {}
