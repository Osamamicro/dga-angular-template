import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DgaButtonComponent } from 'dga-components';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [DgaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <header class="demo-page__header">
        <h1 class="demo-page__title-ar">{{ i18n.t('buttons.pageTitle') }}</h1>
        @if (i18n.t('buttons.pageSubtitle')) {
          <p class="demo-page__title-en">{{ i18n.t('buttons.pageSubtitle') }}</p>
        }
      </header>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('buttons.variants.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('buttons.variants.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-button variant="primary">Primary</dga-button>
            <dga-button variant="secondary">Secondary</dga-button>
            <dga-button variant="outline">Outline</dga-button>
            <dga-button variant="ghost">Ghost</dga-button>
            <dga-button variant="danger">Danger</dga-button>
            <dga-button variant="tertiary">Tertiary</dga-button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('buttons.sizes.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('buttons.sizes.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-button size="sm">Small</dga-button>
            <dga-button size="md">Medium</dga-button>
            <dga-button size="lg">Large</dga-button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('buttons.disabled.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('buttons.disabled.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-button variant="primary" [disabled]="true">Disabled Primary</dga-button>
            <dga-button variant="secondary" [disabled]="true">Disabled Secondary</dga-button>
            <dga-button variant="outline" [disabled]="true">Disabled Outline</dga-button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('buttons.loading.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('buttons.loading.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-button variant="primary" [loading]="true">Loading Primary</dga-button>
            <dga-button variant="secondary" [loading]="true">Loading Secondary</dga-button>
            <dga-button variant="outline" [loading]="true">Loading Outline</dga-button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('buttons.fullWidth.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('buttons.fullWidth.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-button variant="primary" [fullWidth]="true">Full Width Button</dga-button>
        </div>
      </section>
    </div>
  `,
  styles: ``,
})
export class ButtonsComponent {
  readonly i18n = inject(TranslationService);
}
