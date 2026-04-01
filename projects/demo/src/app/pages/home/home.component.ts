import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DgaCardComponent } from 'dga-components';
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
  imports: [RouterLink, DgaCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero__content">
          <h1 class="hero__title">{{ i18n.t('home.hero.title') }}</h1>
          <p class="hero__subtitle-ar">
            {{ i18n.t('home.hero.subtitle') }}
          </p>
          @if (i18n.t('home.hero.subtitleEn')) {
            <p class="hero__subtitle-en">
              {{ i18n.t('home.hero.subtitleEn') }}
            </p>
          }
          <div class="hero__actions">
            <a routerLink="/buttons" class="hero__btn hero__btn--primary">
              {{ i18n.t('home.hero.cta.browse') }}
            </a>
            <a
              href="https://github.com/Osamamicro/dga-angular-template"
              target="_blank"
              rel="noopener noreferrer"
              class="hero__btn hero__btn--outline"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <!-- Component Cards Grid -->
      <section class="cards-section">
        <div class="cards-grid">
          @for (page of pages(); track page.route) {
            <a [routerLink]="page.route" class="card-link">
              <dga-card variant="shadow" [interactive]="true">
                <h3 class="card-title">{{ page.title }}</h3>
                @if (page.subtitle) {
                  <p class="card-subtitle">{{ page.subtitle }}</p>
                }
                <p class="card-description">{{ page.description }}</p>
              </dga-card>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .home {
      font-family: var(--dga-font-family-arabic, 'IBM Plex Sans Arabic', sans-serif);
    }

    /* Hero Section */
    .hero {
      width: 100vw;
      position: relative;
      right: 50%;
      left: 50%;
      margin-right: -50vw;
      margin-left: -50vw;
      background: linear-gradient(135deg, #1a7a4e 0%, #25935f 100%);
      padding: 80px var(--dga-spacing-xl, 24px);
      text-align: center;
      color: #fff;
    }

    .hero__content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero__title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 var(--dga-spacing-lg, 24px);
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .hero__subtitle-ar {
      font-size: 1.25rem;
      margin: 0 0 var(--dga-spacing-sm, 8px);
      opacity: 0.92;
      line-height: 1.8;
    }

    .hero__subtitle-en {
      font-size: 1rem;
      margin: 0 0 var(--dga-spacing-2xl, 40px);
      opacity: 0.75;
      font-family: 'IBM Plex Sans', sans-serif;
      direction: ltr;
    }

    .hero__actions {
      display: flex;
      gap: var(--dga-spacing-md, 16px);
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 32px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
      min-width: 160px;
      font-family: inherit;
    }

    .hero__btn--primary {
      background: #fff;
      color: #25935f;
    }

    .hero__btn--primary:hover {
      background: #f0faf5;
      transform: translateY(-1px);
    }

    .hero__btn--outline {
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255, 255, 255, 0.7);
    }

    .hero__btn--outline:hover {
      border-color: #fff;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    /* Cards Section */
    .cards-section {
      padding: var(--dga-spacing-3xl, 64px) 0;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--dga-spacing-lg, 24px);
    }

    .card-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .card-title {
      margin: 0 0 var(--dga-spacing-2xs, 4px);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--dga-primary-color-600, #25935f);
    }

    .card-subtitle {
      margin: 0 0 var(--dga-spacing-sm, 8px);
      font-size: 0.85rem;
      color: var(--dga-neutral-color-400, #999);
    }

    .card-description {
      margin: 0;
      font-size: 0.9rem;
      color: var(--dga-neutral-color-500, #6b6b6b);
      line-height: 1.7;
    }

    @media (max-width: 640px) {
      .hero__title {
        font-size: 2rem;
      }

      .hero {
        padding: 48px var(--dga-spacing-md, 16px);
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class HomeComponent {
  readonly i18n = inject(TranslationService);

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
