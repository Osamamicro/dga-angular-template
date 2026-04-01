import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DgaCardComponent } from 'dga-components';

interface ShowcasePage {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DgaCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <div class="demo-page__hero">
        <h1 class="demo-page__title">DGA Angular Template</h1>
        <p class="demo-page__subtitle">
          A comprehensive component library built on the Saudi National Design System
        </p>
      </div>

      <section class="demo-section">
        <h2 class="demo-section__title">Components</h2>
        <div class="demo-section__content demo-grid">
          @for (page of pages; track page.route) {
            <a [routerLink]="page.route" class="demo-grid__link">
              <dga-card variant="shadow" [interactive]="true">
                <h3>{{ page.title }}</h3>
                <p>{{ page.description }}</p>
              </dga-card>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .demo-page__hero {
      text-align: center;
      padding: var(--dga-spacing-3xl) 0;
    }
    .demo-page__subtitle {
      font-size: 1.25rem;
      color: var(--dga-neutral-color-500);
      margin-top: var(--dga-spacing-sm);
    }
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .demo-grid__link {
      text-decoration: none;
      color: inherit;
    }
    .demo-grid__link h3 {
      margin: 0 0 var(--dga-spacing-xs);
      color: var(--dga-primary-color-600);
    }
    .demo-grid__link p {
      margin: 0;
      color: var(--dga-neutral-color-500);
      font-size: 0.875rem;
    }
  `,
})
export class HomeComponent {
  readonly pages: ShowcasePage[] = [
    {
      title: 'Buttons',
      description: 'All button variants, sizes, and states',
      route: '/buttons',
    },
    {
      title: 'Forms',
      description: 'Input, textarea, select, checkbox, radio, switch, datepicker, and file upload',
      route: '/forms',
    },
    {
      title: 'Cards',
      description: 'Cards, tags, alerts, and accordions',
      route: '/cards',
    },
    {
      title: 'Tables',
      description: 'Data tables with sorting, striped variant, and pagination',
      route: '/tables',
    },
    {
      title: 'Navigation',
      description: 'Breadcrumbs, tabs, stepper, and sidebar',
      route: '/navigation',
    },
    {
      title: 'Feedback',
      description: 'Modals, tooltips, and popovers',
      route: '/feedback',
    },
    {
      title: 'Loading',
      description: 'Spinners, progress bars, skeletons, and avatars',
      route: '/loading',
    },
  ];
}
