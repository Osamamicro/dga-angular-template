import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DgaCardComponent } from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { TranslationService } from '../../i18n/translation.service';

interface ShowcasePage {
  title: string;
  subtitle: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DgaCardComponent, CodePreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <!-- Welcome Section -->
      <div class="home__welcome">
        <h1 class="home__title">{{ i18n.t('home.welcome.title') }}</h1>
        <p class="home__description">{{ i18n.t('home.welcome.description') }}</p>
      </div>

      <!-- Quick Start -->
      <div class="home__section">
        <h2 class="home__section-title">{{ i18n.t('home.quickStart') }}</h2>

        <div class="home__step">
          <span class="home__step-number">1</span>
          <span class="home__step-label">{{ i18n.t('home.installStep') }}</span>
        </div>
        <app-code-preview [codeLabel]="'Terminal'" [code]="installCode" />

        <div class="home__step">
          <span class="home__step-number">2</span>
          <span class="home__step-label">{{ i18n.t('home.importStep') }}</span>
        </div>
        <app-code-preview [codeLabel]="'TypeScript'" [code]="importCode" />
      </div>

      <!-- Components Overview -->
      <div class="home__section">
        <h2 class="home__section-title">{{ i18n.t('home.exploreComponents') }}</h2>
        <div class="home__grid">
          @for (page of pages(); track page.route) {
            <a [routerLink]="page.route" class="home__card-link">
              <dga-card variant="shadow" [interactive]="true">
                <h3 class="home__card-title">{{ page.title }}</h3>
                @if (page.subtitle) {
                  <p class="home__card-subtitle">{{ page.subtitle }}</p>
                }
                <p class="home__card-desc">{{ page.description }}</p>
              </dga-card>
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .home__welcome {
      margin-bottom: var(--dga-spacing-3xl, 64px);
    }

    .home__title {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900, #111827);
      margin: 0 0 var(--dga-spacing-md, 16px);
      line-height: 1.3;
    }

    .home__description {
      font-size: 1.1rem;
      color: var(--dga-neutral-color-500, #6b7280);
      margin: 0;
      line-height: 1.8;
      max-width: 640px;
    }

    .home__section {
      margin-bottom: var(--dga-spacing-3xl, 64px);
    }

    .home__section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900, #111827);
      margin: 0 0 var(--dga-spacing-lg, 24px);
    }

    .home__step {
      display: flex;
      align-items: center;
      gap: var(--dga-spacing-sm, 8px);
      margin-top: var(--dga-spacing-lg, 24px);
    }

    .home__step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--dga-primary-color-600, #25935f);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .home__step-label {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--dga-neutral-color-800, #1f2937);
    }

    .home__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: var(--dga-spacing-lg, 24px);
    }

    .home__card-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .home__card-title {
      margin: 0 0 var(--dga-spacing-2xs, 4px);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--dga-primary-color-600, #25935f);
    }

    .home__card-subtitle {
      margin: 0 0 var(--dga-spacing-xs, 8px);
      font-size: 0.8rem;
      color: var(--dga-neutral-color-400, #9ca3af);
    }

    .home__card-desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500, #6b7280);
      line-height: 1.7;
    }
  `,
})
export class HomeComponent {
  readonly i18n = inject(TranslationService);

  readonly installCode = `npm install dga-components`;

  readonly importCode = `import { DgaButtonComponent } from 'dga-components';

@Component({
  standalone: true,
  imports: [DgaButtonComponent],
  template: '<dga-button variant="primary">Click me</dga-button>'
})
export class MyComponent {}`;

  readonly pages = computed<ShowcasePage[]>(() => [
    {
      title: this.i18n.t('home.card.buttons.title'),
      subtitle: this.i18n.t('home.card.buttons.subtitle'),
      description: this.i18n.t('home.card.buttons.desc'),
      route: '/buttons',
    },
    {
      title: this.i18n.t('home.card.forms.title'),
      subtitle: this.i18n.t('home.card.forms.subtitle'),
      description: this.i18n.t('home.card.forms.desc'),
      route: '/forms',
    },
    {
      title: this.i18n.t('home.card.cards.title'),
      subtitle: this.i18n.t('home.card.cards.subtitle'),
      description: this.i18n.t('home.card.cards.desc'),
      route: '/cards',
    },
    {
      title: this.i18n.t('home.card.tables.title'),
      subtitle: this.i18n.t('home.card.tables.subtitle'),
      description: this.i18n.t('home.card.tables.desc'),
      route: '/tables',
    },
    {
      title: this.i18n.t('home.card.navigation.title'),
      subtitle: this.i18n.t('home.card.navigation.subtitle'),
      description: this.i18n.t('home.card.navigation.desc'),
      route: '/navigation',
    },
    {
      title: this.i18n.t('home.card.feedback.title'),
      subtitle: this.i18n.t('home.card.feedback.subtitle'),
      description: this.i18n.t('home.card.feedback.desc'),
      route: '/feedback',
    },
    {
      title: this.i18n.t('home.card.loading.title'),
      subtitle: this.i18n.t('home.card.loading.subtitle'),
      description: this.i18n.t('home.card.loading.desc'),
      route: '/loading',
    },
    {
      title: this.i18n.t('home.card.templates.title'),
      subtitle: this.i18n.t('home.card.templates.subtitle'),
      description: this.i18n.t('home.card.templates.desc'),
      route: '/templates/dashboard',
    },
  ]);
}
