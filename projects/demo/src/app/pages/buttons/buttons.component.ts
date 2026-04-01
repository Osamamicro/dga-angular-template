import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DgaButtonComponent } from 'dga-components';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [DgaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <h1 class="demo-page__title">Buttons</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Variants</h2>
        <div class="demo-section__content demo-row">
          <dga-button variant="primary">Primary</dga-button>
          <dga-button variant="secondary">Secondary</dga-button>
          <dga-button variant="outline">Outline</dga-button>
          <dga-button variant="ghost">Ghost</dga-button>
          <dga-button variant="danger">Danger</dga-button>
          <dga-button variant="tertiary">Tertiary</dga-button>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Sizes</h2>
        <div class="demo-section__content demo-row demo-row--align-center">
          <dga-button size="sm">Small</dga-button>
          <dga-button size="md">Medium</dga-button>
          <dga-button size="lg">Large</dga-button>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Disabled</h2>
        <div class="demo-section__content demo-row">
          <dga-button variant="primary" [disabled]="true">Disabled Primary</dga-button>
          <dga-button variant="secondary" [disabled]="true">Disabled Secondary</dga-button>
          <dga-button variant="outline" [disabled]="true">Disabled Outline</dga-button>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Loading</h2>
        <div class="demo-section__content demo-row">
          <dga-button variant="primary" [loading]="true">Loading Primary</dga-button>
          <dga-button variant="secondary" [loading]="true">Loading Secondary</dga-button>
          <dga-button variant="outline" [loading]="true">Loading Outline</dga-button>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Full Width</h2>
        <div class="demo-section__content">
          <dga-button variant="primary" [fullWidth]="true">Full Width Button</dga-button>
        </div>
      </section>
    </div>
  `,
  styles: `
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--dga-spacing-md);
    }
    .demo-row--align-center {
      align-items: center;
    }
  `,
})
export class ButtonsComponent {}
