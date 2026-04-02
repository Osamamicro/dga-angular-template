import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DgaCardComponent,
  DgaTagComponent,
  DgaAlertComponent,
  DgaAccordionComponent,
  DgaAccordionItemComponent,
} from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    DgaCardComponent,
    DgaTagComponent,
    DgaAlertComponent,
    DgaAccordionComponent,
    DgaAccordionItemComponent,
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <h1 class="docs-page__title">{{ i18n.t('cards.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('cards.description') }}</p>

        <!-- Live Demo -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <div class="demo-card-grid">
              <dga-card variant="shadow">
                <h3>Shadow Card</h3>
                <p>A card with a subtle shadow for depth.</p>
              </dga-card>
              <dga-card variant="outlined">
                <h3>Outlined Card</h3>
                <p>A card with a visible border outline.</p>
              </dga-card>
            </div>
          </div>
        </app-code-preview>

        <!-- Card Variants -->
        <app-section-header
          [title]="i18n.t('cards.variants.title')"
          [description]="i18n.t('cards.variants.desc')"
          anchorId="card-variants"
        />
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

        <!-- Tags Colors -->
        <app-section-header
          [title]="i18n.t('cards.tagsColors.title')"
          [description]="i18n.t('cards.tagsColors.desc')"
          anchorId="tags-colors"
        />
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

        <!-- Tags Styles -->
        <app-section-header
          [title]="i18n.t('cards.tagsStyles.title')"
          [description]="i18n.t('cards.tagsStyles.desc')"
          anchorId="tags-styles"
        />
        <div class="demo-preview">
          <div class="demo-row">
            <dga-tag color="primary">Subtle (default)</dga-tag>
            <dga-tag color="primary" [style]="'filled'">Filled</dga-tag>
            <dga-tag color="primary" [style]="'outline'">Outline</dga-tag>
          </div>
        </div>

        <!-- Tags Removable -->
        <app-section-header
          [title]="i18n.t('cards.tagsRemovable.title')"
          [description]="i18n.t('cards.tagsRemovable.desc')"
          anchorId="tags-removable"
        />
        <div class="demo-preview">
          <div class="demo-row">
            <dga-tag color="primary" [removable]="true">Removable</dga-tag>
            <dga-tag color="danger" [removable]="true">Remove Me</dga-tag>
          </div>
        </div>

        <!-- Alerts -->
        <app-section-header
          [title]="i18n.t('cards.alerts.title')"
          [description]="i18n.t('cards.alerts.desc')"
          anchorId="alerts"
        />
        <div class="demo-preview">
          <div class="demo-stack">
            <dga-alert severity="info">This is an informational alert.</dga-alert>
            <dga-alert severity="success">Operation completed successfully.</dga-alert>
            <dga-alert severity="warning">Please review before proceeding.</dga-alert>
            <dga-alert severity="error">An error occurred. Please try again.</dga-alert>
            <dga-alert severity="info" [dismissible]="true">This alert can be dismissed.</dga-alert>
          </div>
        </div>

        <!-- Accordion -->
        <app-section-header
          [title]="i18n.t('cards.accordion.title')"
          [description]="i18n.t('cards.accordion.desc')"
          anchorId="accordion"
        />
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

        <!-- Accessibility -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>Cards use semantic HTML structure</li>
            <li>Accordion items are keyboard navigable</li>
            <li>Alert severity conveyed through role and aria-label</li>
            <li>Removable tags have accessible dismiss button</li>
          </ul>
        </div>
      </div>

      <app-docs-toc [heading]="i18n.t('docs.onThisPage')" [items]="tocItems" />
    </div>
  `,
  styles: `
    .docs-page { display: flex; gap: var(--dga-spacing-3xl, 64px); }
    .docs-page__content { flex: 1; min-width: 0; }
    .docs-page__title { font-size: 2rem; font-weight: 700; color: var(--dga-neutral-color-900, #111827); margin: 0 0 var(--dga-spacing-sm, 8px); }
    .docs-page__description { font-size: 1rem; color: var(--dga-neutral-color-500, #6b7280); margin: 0 0 var(--dga-spacing-2xl, 40px); line-height: 1.7; max-width: 680px; }
    .docs-page__subtitle { font-size: 0.9rem; color: var(--dga-neutral-color-500, #6b7280); margin: 0 0 var(--dga-spacing-md, 16px); }
    .docs-accessibility ul { padding-inline-start: var(--dga-spacing-lg, 24px); color: var(--dga-neutral-color-600, #4b5563); line-height: 2; }
    h3 { font-size: 1.1rem; font-weight: 600; color: var(--dga-neutral-color-800, #1f2937); margin: var(--dga-spacing-xl, 32px) 0 var(--dga-spacing-xs, 8px); }
    .demo-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .demo-card-grid h3 { margin: 0 0 var(--dga-spacing-xs); }
    .demo-card-grid p { margin: 0; color: var(--dga-neutral-color-500); }
  `,
})
export class CardsComponent {
  readonly i18n = inject(TranslationService);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Card Variants', anchorId: 'card-variants' },
    { label: 'Tags Colors', anchorId: 'tags-colors' },
    { label: 'Tags Styles', anchorId: 'tags-styles' },
    { label: 'Tags Removable', anchorId: 'tags-removable' },
    { label: 'Alerts', anchorId: 'alerts' },
    { label: 'Accordion', anchorId: 'accordion' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaCardComponent } from 'dga-components';

@Component({
  imports: [DgaCardComponent],
  template: \`
    <dga-card variant="shadow">
      <h3>Card Title</h3>
      <p>Card content goes here.</p>
    </dga-card>
  \`
})`;
}
