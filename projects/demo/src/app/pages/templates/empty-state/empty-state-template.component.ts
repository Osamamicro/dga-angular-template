import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DgaButtonComponent } from 'dga-components';

@Component({
  selector: 'app-empty-state-template',
  standalone: true,
  imports: [DgaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <div class="empty-state">
        <div class="empty-state__icon"></div>
        <h2 class="empty-state__title">لا توجد بيانات</h2>
        <p class="empty-state__description">
          There are no records to display at the moment. Create a new entry to get started.
        </p>
        <dga-button variant="primary">Create New</dga-button>
      </div>
    </div>
  `,
  styles: `
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--dga-spacing-3xl) var(--dga-spacing-lg);
      min-height: 400px;
    }
    .empty-state__icon {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background-color: var(--dga-neutral-color-100);
      margin-bottom: var(--dga-spacing-lg);
    }
    .empty-state__title {
      margin: 0 0 var(--dga-spacing-sm);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dga-neutral-color-900);
    }
    .empty-state__description {
      margin: 0 0 var(--dga-spacing-lg);
      font-size: 1rem;
      color: var(--dga-neutral-color-500);
      max-width: 400px;
    }
  `,
})
export class EmptyStateTemplateComponent {}
