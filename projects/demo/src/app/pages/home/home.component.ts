import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DgaCardComponent } from 'dga-components';
import { TranslationService } from '../../i18n/translation.service';

interface ShowcasePage {
  title: string;
  subtitle: string;
  description: string;
  route: string;
  icon: string;
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
              href="https://github.com/nicoacos/dga-angular-template"
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
                <div class="card-inner">
                  <div class="card-icon" [innerHTML]="page.icon"></div>
                  <h3 class="card-title">{{ page.title }}</h3>
                  @if (page.subtitle) {
                    <p class="card-subtitle">{{ page.subtitle }}</p>
                  }
                  <p class="card-description">{{ page.description }}</p>
                </div>
              </dga-card>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .home {
      direction: rtl;
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

    .card-inner {
      text-align: right;
    }

    .card-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--dga-spacing-md, 16px);
      color: var(--dga-primary-color-600, #25935f);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-icon :global(svg) {
      width: 48px;
      height: 48px;
    }

    .card-title {
      margin: 0 0 var(--dga-spacing-2xs, 4px);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900, #1a1a1a);
    }

    .card-subtitle {
      margin: 0 0 var(--dga-spacing-sm, 8px);
      font-size: 0.85rem;
      color: var(--dga-neutral-color-400, #999);
      font-family: 'IBM Plex Sans', sans-serif;
      direction: ltr;
      text-align: right;
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
      description: this.i18n.t('home.card.buttons.description'),
      route: '/buttons',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="14" width="40" height="20" rx="6" stroke="currentColor" stroke-width="2.5"/><rect x="14" y="21" width="20" height="6" rx="3" fill="currentColor" opacity="0.3"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.forms.title'),
      subtitle: this.i18n.t('home.card.forms.subtitle'),
      description: this.i18n.t('home.card.forms.description'),
      route: '/forms',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="36" height="12" rx="3" stroke="currentColor" stroke-width="2.5"/><rect x="6" y="28" width="36" height="12" rx="3" stroke="currentColor" stroke-width="2.5"/><line x1="12" y1="14" x2="30" y2="14" stroke="currentColor" stroke-width="2" opacity="0.4"/><line x1="12" y1="34" x2="24" y2="34" stroke="currentColor" stroke-width="2" opacity="0.4"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.cards.title'),
      subtitle: this.i18n.t('home.card.cards.subtitle'),
      description: this.i18n.t('home.card.cards.description'),
      route: '/cards',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="40" height="36" rx="4" stroke="currentColor" stroke-width="2.5"/><line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" stroke-width="2.5"/><rect x="10" y="22" width="16" height="4" rx="2" fill="currentColor" opacity="0.3"/><rect x="10" y="30" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.15"/><rect x="10" y="36" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.15"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.tables.title'),
      subtitle: this.i18n.t('home.card.tables.subtitle'),
      description: this.i18n.t('home.card.tables.description'),
      route: '/tables',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="40" height="36" rx="4" stroke="currentColor" stroke-width="2.5"/><line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" stroke-width="2"/><line x1="4" y1="26" x2="44" y2="26" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><line x1="4" y1="36" x2="44" y2="36" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><line x1="18" y1="6" x2="18" y2="42" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><line x1="32" y1="6" x2="32" y2="42" stroke="currentColor" stroke-width="1.5" opacity="0.4"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.navigation.title'),
      subtitle: this.i18n.t('home.card.navigation.subtitle'),
      description: this.i18n.t('home.card.navigation.description'),
      route: '/navigation',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="40" height="8" rx="3" stroke="currentColor" stroke-width="2.5"/><rect x="8" y="11" width="4" height="2" rx="1" fill="currentColor" opacity="0.4"/><rect x="16" y="11" width="4" height="2" rx="1" fill="currentColor" opacity="0.4"/><rect x="24" y="11" width="4" height="2" rx="1" fill="currentColor" opacity="0.4"/><rect x="4" y="22" width="12" height="20" rx="3" stroke="currentColor" stroke-width="2" opacity="0.5"/><rect x="20" y="22" width="24" height="20" rx="3" stroke="currentColor" stroke-width="2" opacity="0.3"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.feedback.title'),
      subtitle: this.i18n.t('home.card.feedback.subtitle'),
      description: this.i18n.t('home.card.feedback.description'),
      route: '/feedback',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="36" height="24" rx="4" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="20" r="2.5" fill="currentColor"/><rect x="22" y="25" width="4" height="6" rx="2" fill="currentColor" opacity="0.5"/><line x1="14" y1="38" x2="34" y2="38" stroke="currentColor" stroke-width="2" opacity="0.3"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.loading.title'),
      subtitle: this.i18n.t('home.card.loading.subtitle'),
      description: this.i18n.t('home.card.loading.description'),
      route: '/loading',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.5" opacity="0.2"/><path d="M24 6a18 18 0 0 1 18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.15"/></svg>`,
    },
    {
      title: this.i18n.t('home.card.templates.title'),
      subtitle: this.i18n.t('home.card.templates.subtitle'),
      description: this.i18n.t('home.card.templates.description'),
      route: '/templates/dashboard',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2.5"/><rect x="26" y="4" width="18" height="10" rx="3" stroke="currentColor" stroke-width="2.5"/><rect x="4" y="26" width="18" height="10" rx="3" stroke="currentColor" stroke-width="2.5"/><rect x="26" y="18" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2.5" opacity="0.5"/><rect x="4" y="40" width="40" height="4" rx="2" fill="currentColor" opacity="0.15"/></svg>`,
    },
  ]);
}
