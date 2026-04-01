import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    <div class="demo-page">
      <h1 class="demo-page__title">Cards, Tags, Alerts &amp; Accordions</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Card Variants</h2>
        <div class="demo-section__content demo-card-grid">
          <dga-card variant="flat">
            <h3>Flat Card</h3>
            <p>A card with no elevation, blending with the background.</p>
          </dga-card>
          <dga-card variant="shadow">
            <h3>Shadow Card</h3>
            <p>A card with a subtle shadow for depth.</p>
          </dga-card>
          <dga-card variant="outlined">
            <h3>Outlined Card</h3>
            <p>A card with a visible border outline.</p>
          </dga-card>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Tags — Colors</h2>
        <div class="demo-section__content demo-row">
          <dga-tag color="primary">Primary</dga-tag>
          <dga-tag color="secondary">Secondary</dga-tag>
          <dga-tag color="success">Success</dga-tag>
          <dga-tag color="warning">Warning</dga-tag>
          <dga-tag color="danger">Danger</dga-tag>
          <dga-tag color="info">Info</dga-tag>
          <dga-tag color="info">Neutral-like</dga-tag>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Tags — Styles</h2>
        <div class="demo-section__content demo-row">
          <dga-tag color="primary">Subtle (default)</dga-tag>
          <dga-tag color="primary" [style]="'filled'">Filled</dga-tag>
          <dga-tag color="primary" [style]="'outline'">Outline</dga-tag>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Tags — Removable</h2>
        <div class="demo-section__content demo-row">
          <dga-tag color="primary" [removable]="true">Removable</dga-tag>
          <dga-tag color="danger" [removable]="true">Remove Me</dga-tag>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Alerts</h2>
        <div class="demo-section__content demo-stack">
          <dga-alert severity="info">This is an informational alert.</dga-alert>
          <dga-alert severity="success">Operation completed successfully.</dga-alert>
          <dga-alert severity="warning">Please review before proceeding.</dga-alert>
          <dga-alert severity="error">An error occurred. Please try again.</dga-alert>
          <dga-alert severity="info" [dismissible]="true">This alert can be dismissed.</dga-alert>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Accordion</h2>
        <div class="demo-section__content">
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
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--dga-spacing-sm);
      align-items: center;
    }
    .demo-stack {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-md);
    }
  `,
})
export class CardsComponent {}
