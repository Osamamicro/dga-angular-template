import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
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
      <header class="demo-page__header">
        <h1 class="demo-page__title-ar">{{ i18n.t('feedback.pageTitle') }}</h1>
        @if (i18n.t('feedback.pageSubtitle')) {
          <p class="demo-page__title-en">{{ i18n.t('feedback.pageSubtitle') }}</p>
        }
      </header>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('feedback.modal.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('feedback.modal.desc') }}</p>
        </div>
        <div class="demo-preview">
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
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('feedback.tooltips.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('feedback.tooltips.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
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
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('feedback.popover.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('feedback.popover.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
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
        </div>
      </section>
    </div>
  `,
})
export class FeedbackComponent {
  readonly i18n = inject(TranslationService);
  readonly modalOpen = signal(false);
}
