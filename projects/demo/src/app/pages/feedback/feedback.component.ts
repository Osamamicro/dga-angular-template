import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  DgaModalComponent,
  DgaButtonComponent,
  DgaTooltipDirective,
  DgaPopoverComponent,
} from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    DgaModalComponent,
    DgaButtonComponent,
    DgaTooltipDirective,
    DgaPopoverComponent,
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <h1 class="docs-page__title">{{ i18n.t('feedback.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('feedback.description') }}</p>

        <!-- Live Demo -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <div class="demo-row">
              <dga-button variant="outline" dgaTooltip="Tooltip on top" dgaTooltipPosition="top">
                Hover me
              </dga-button>
              <dga-button variant="primary" (click)="modalOpen.set(true)">
                Open Modal
              </dga-button>
            </div>
          </div>
        </app-code-preview>

        <!-- Modal -->
        <app-section-header
          [title]="i18n.t('feedback.modal.title')"
          [description]="i18n.t('feedback.modal.desc')"
          anchorId="modal"
        />
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

        <!-- Tooltips -->
        <app-section-header
          [title]="i18n.t('feedback.tooltips.title')"
          [description]="i18n.t('feedback.tooltips.desc')"
          anchorId="tooltips"
        />
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

        <!-- Popover -->
        <app-section-header
          [title]="i18n.t('feedback.popover.title')"
          [description]="i18n.t('feedback.popover.desc')"
          anchorId="popover"
        />
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

        <!-- Accessibility -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>Modal traps focus when open</li>
            <li>Modal can be closed with Escape key</li>
            <li>Tooltips accessible via keyboard focus</li>
            <li>Popover content announced to screen readers</li>
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
  `,
})
export class FeedbackComponent {
  readonly i18n = inject(TranslationService);
  readonly modalOpen = signal(false);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Modal', anchorId: 'modal' },
    { label: 'Tooltips', anchorId: 'tooltips' },
    { label: 'Popover', anchorId: 'popover' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaModalComponent, DgaButtonComponent } from 'dga-components';

@Component({
  imports: [DgaModalComponent, DgaButtonComponent],
  template: \`
    <dga-button variant="primary" (click)="modalOpen.set(true)">
      Open Modal
    </dga-button>

    <dga-modal
      [open]="modalOpen()"
      modalTitle="Example Modal"
      size="md"
      (closed)="modalOpen.set(false)"
    >
      <p>Modal content goes here.</p>
    </dga-modal>
  \`
})`;
}
