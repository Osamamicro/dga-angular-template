import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import {
  DgaCardComponent,
  DgaTagComponent,
  DgaAlertComponent,
  DgaAccordionComponent,
  DgaAccordionItemComponent,
} from 'dga-components';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    DgaCardComponent,
    DgaTagComponent,
    DgaAlertComponent,
    DgaAccordionComponent,
    DgaAccordionItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page" dir="rtl">
      <header class="demo-page__header">
        <h1 class="demo-page__title-ar">{{ i18n.t('cards.pageTitle') }}</h1>
        @if (i18n.t('cards.pageSubtitle')) {
          <p class="demo-page__title-en">{{ i18n.t('cards.pageSubtitle') }}</p>
        }
      </header>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('cards.variants.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('cards.variants.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-card-grid">
            <dga-card variant="flat">
              <h3>{{ i18n.t('cards.flat') }}</h3>
              <p>{{ i18n.t('cards.flat.desc') }}</p>
            </dga-card>
            <dga-card variant="shadow">
              <h3>{{ i18n.t('cards.shadow') }}</h3>
              <p>{{ i18n.t('cards.shadow.desc') }}</p>
            </dga-card>
            <dga-card variant="outlined">
              <h3>{{ i18n.t('cards.outlined') }}</h3>
              <p>{{ i18n.t('cards.outlined.desc') }}</p>
            </dga-card>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('cards.tagsColors.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('cards.tagsColors.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-tag color="primary">Primary</dga-tag>
            <dga-tag color="secondary">Secondary</dga-tag>
            <dga-tag color="success">Success</dga-tag>
            <dga-tag color="warning">Warning</dga-tag>
            <dga-tag color="danger">Danger</dga-tag>
            <dga-tag color="info">Info</dga-tag>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('cards.tagsStyles.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('cards.tagsStyles.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-tag color="primary">Subtle (default)</dga-tag>
            <dga-tag color="primary" [style]="'filled'">Filled</dga-tag>
            <dga-tag color="primary" [style]="'outline'">Outline</dga-tag>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('cards.tagsRemovable.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('cards.tagsRemovable.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-tag color="primary" [removable]="true">Removable</dga-tag>
            <dga-tag color="danger" [removable]="true">Remove Me</dga-tag>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('cards.alerts.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('cards.alerts.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-stack">
            <dga-alert severity="info">This is an informational alert.</dga-alert>
            <dga-alert severity="success">Operation completed successfully.</dga-alert>
            <dga-alert severity="warning">Please review before proceeding.</dga-alert>
            <dga-alert severity="error">An error occurred. Please try again.</dga-alert>
            <dga-alert severity="info" [dismissible]="true">This alert can be dismissed.</dga-alert>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('cards.accordion.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('cards.accordion.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-accordion>
            <dga-accordion-item title="What is the DGA Design System?">
              The DGA National Design System provides a unified set of UI components
              and design tokens for Saudi government digital platforms.
            </dga-accordion-item>
            <dga-accordion-item title="How do I install it?">
              Install via npm and import the components you need.
              Each component is standalone and tree-shakeable.
            </dga-accordion-item>
            <dga-accordion-item title="Is RTL supported?">
              Yes, all components fully support right-to-left layouts
              with direction-aware mixins and logical properties.
            </dga-accordion-item>
          </dga-accordion>
        </div>
      </section>
    </div>
  `,
  styles: `
    .demo-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .demo-card-grid h3 {
      margin: 0 0 var(--dga-spacing-xs);
    }
    .demo-card-grid p {
      margin: 0;
      color: var(--dga-neutral-color-500);
    }
  `,
})
export class CardsComponent {
  readonly i18n = inject(TranslationService);
}
