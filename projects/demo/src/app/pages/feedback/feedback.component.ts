import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DgaModalComponent,
  DgaButtonComponent,
  DgaTooltipDirective,
  DgaPopoverComponent,
} from 'dga-components';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    DgaModalComponent,
    DgaButtonComponent,
    DgaTooltipDirective,
    DgaPopoverComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <h1 class="demo-page__title">Feedback</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Modal</h2>
        <div class="demo-section__content">
          <dga-button variant="primary" (click)="modalOpen.set(true)">
            Open Modal
          </dga-button>

          <dga-modal
            [open]="modalOpen()"
            modalTitle="Example Modal"
            size="md"
            (closed)="modalOpen.set(false)"
          >
            <p>This is the modal body content. You can place any content here.</p>
            <div style="margin-top: var(--dga-spacing-md); display: flex; gap: var(--dga-spacing-sm); justify-content: flex-end;">
              <dga-button variant="outline" (click)="modalOpen.set(false)">Cancel</dga-button>
              <dga-button variant="primary" (click)="modalOpen.set(false)">Confirm</dga-button>
            </div>
          </dga-modal>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Tooltips</h2>
        <div class="demo-section__content demo-row">
          <dga-button variant="outline" dgaTooltip="Tooltip on top" dgaTooltipPosition="top">
            Top
          </dga-button>
          <dga-button variant="outline" dgaTooltip="Tooltip on right" dgaTooltipPosition="right">
            Right
          </dga-button>
          <dga-button variant="outline" dgaTooltip="Tooltip on bottom" dgaTooltipPosition="bottom">
            Bottom
          </dga-button>
          <dga-button variant="outline" dgaTooltip="Tooltip on left" dgaTooltipPosition="left">
            Left
          </dga-button>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Popover</h2>
        <div class="demo-section__content demo-row">
          <dga-popover position="bottom">
            <dga-button popover-trigger variant="outline">
              Click for Popover
            </dga-button>
            <div>
              <h4 style="margin: 0 0 var(--dga-spacing-xs);">Popover Title</h4>
              <p style="margin: 0; color: var(--dga-neutral-color-500);">
                This is the popover body content with additional details.
              </p>
            </div>
          </dga-popover>

          <dga-popover position="right">
            <dga-button popover-trigger variant="outline">
              Right Popover
            </dga-button>
            <div>
              <p style="margin: 0;">Popover content positioned to the right.</p>
            </div>
          </dga-popover>
        </div>
      </section>
    </div>
  `,
  styles: `
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--dga-spacing-md);
      align-items: center;
    }
  `,
})
export class FeedbackComponent {
  readonly modalOpen = signal(false);
}
