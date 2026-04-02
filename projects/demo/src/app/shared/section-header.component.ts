// projects/demo/src/app/shared/section-header.component.ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-section-header" [id]="anchorId()">
      <h2 class="docs-section-header__title">{{ title() }}</h2>
      @if (description()) {
        <p class="docs-section-header__desc">{{ description() }}</p>
      }
    </div>
  `,
  styles: `
    .docs-section-header {
      margin-bottom: var(--dga-spacing-lg, 24px);
      scroll-margin-top: 80px;
    }

    .docs-section-header__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900, #111827);
      margin: 0 0 var(--dga-spacing-xs, 8px);
    }

    .docs-section-header__desc {
      font-size: 0.95rem;
      color: var(--dga-neutral-color-500, #6b7280);
      margin: 0;
      line-height: 1.7;
      max-width: 680px;
    }
  `,
})
export class SectionHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly anchorId = input<string>('');
}
