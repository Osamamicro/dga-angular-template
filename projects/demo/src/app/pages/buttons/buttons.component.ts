import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DgaButtonComponent } from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [
    DgaButtonComponent,
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <!-- Page header -->
        <h1 class="docs-page__title">{{ i18n.t('buttons.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('buttons.description') }}</p>

        <!-- Live Demo section -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <div class="demo-row">
              <dga-button variant="primary">Primary</dga-button>
              <dga-button variant="secondary">Secondary</dga-button>
              <dga-button variant="outline">Outline</dga-button>
            </div>
          </div>
        </app-code-preview>

        <!-- Variants section -->
        <app-section-header
          [title]="i18n.t('buttons.variants.title')"
          [description]="i18n.t('buttons.variants.desc')"
          anchorId="variants"
        />
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

        <!-- Sizes section -->
        <app-section-header
          [title]="i18n.t('buttons.sizes.title')"
          [description]="i18n.t('buttons.sizes.desc')"
          anchorId="sizes"
        />
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-button size="sm">Small</dga-button>
            <dga-button size="md">Medium</dga-button>
            <dga-button size="lg">Large</dga-button>
          </div>
        </div>

        <!-- States section -->
        <app-section-header [title]="i18n.t('docs.states')" anchorId="states" />

        <h3>{{ i18n.t('buttons.disabled.title') }}</h3>
        <p class="docs-page__subtitle">{{ i18n.t('buttons.disabled.desc') }}</p>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-button variant="primary" [disabled]="true">Disabled Primary</dga-button>
            <dga-button variant="secondary" [disabled]="true">Disabled Secondary</dga-button>
            <dga-button variant="outline" [disabled]="true">Disabled Outline</dga-button>
          </div>
        </div>

        <h3>{{ i18n.t('buttons.loading.title') }}</h3>
        <p class="docs-page__subtitle">{{ i18n.t('buttons.loading.desc') }}</p>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-button variant="primary" [loading]="true">Loading Primary</dga-button>
            <dga-button variant="secondary" [loading]="true">Loading Secondary</dga-button>
            <dga-button variant="outline" [loading]="true">Loading Outline</dga-button>
          </div>
        </div>

        <!-- Full Width -->
        <app-section-header
          [title]="i18n.t('buttons.fullWidth.title')"
          [description]="i18n.t('buttons.fullWidth.desc')"
          anchorId="full-width"
        />
        <div class="demo-preview">
          <dga-button variant="primary" [fullWidth]="true">Full Width Button</dga-button>
        </div>

        <!-- Accessibility section -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>All buttons are keyboard-focusable with visible focus rings</li>
            <li>Loading state announces to screen readers via aria-busy</li>
            <li>Disabled buttons use the native disabled attribute</li>
            <li>Color contrast meets WCAG 2.1 AA requirements</li>
          </ul>
        </div>
      </div>

      <!-- Right-side TOC -->
      <app-docs-toc [heading]="i18n.t('docs.onThisPage')" [items]="tocItems" />
    </div>
  `,
  styles: `
    .docs-page {
      display: flex;
      gap: var(--dga-spacing-3xl, 64px);
    }

    .docs-page__content {
      flex: 1;
      min-width: 0;
    }

    .docs-page__title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900, #111827);
      margin: 0 0 var(--dga-spacing-sm, 8px);
    }

    .docs-page__description {
      font-size: 1rem;
      color: var(--dga-neutral-color-500, #6b7280);
      margin: 0 0 var(--dga-spacing-2xl, 40px);
      line-height: 1.7;
      max-width: 680px;
    }

    .docs-page__subtitle {
      font-size: 0.9rem;
      color: var(--dga-neutral-color-500, #6b7280);
      margin: 0 0 var(--dga-spacing-md, 16px);
    }

    .docs-accessibility ul {
      padding-inline-start: var(--dga-spacing-lg, 24px);
      color: var(--dga-neutral-color-600, #4b5563);
      line-height: 2;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dga-neutral-color-800, #1f2937);
      margin: var(--dga-spacing-xl, 32px) 0 var(--dga-spacing-xs, 8px);
    }
  `,
})
export class ButtonsComponent {
  readonly i18n = inject(TranslationService);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Variants', anchorId: 'variants' },
    { label: 'Sizes', anchorId: 'sizes' },
    { label: 'States', anchorId: 'states' },
    { label: 'Full Width', anchorId: 'full-width' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaButtonComponent } from 'dga-components';

@Component({
  imports: [DgaButtonComponent],
  template: \`
    <dga-button variant="primary">Click me</dga-button>
    <dga-button variant="secondary">Secondary</dga-button>
    <dga-button variant="outline">Outline</dga-button>
  \`
})`;
}
