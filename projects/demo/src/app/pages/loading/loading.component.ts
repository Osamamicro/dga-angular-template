import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DgaSpinnerComponent,
  DgaProgressBarComponent,
  DgaSkeletonComponent,
  DgaAvatarComponent,
} from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    DgaSpinnerComponent,
    DgaProgressBarComponent,
    DgaSkeletonComponent,
    DgaAvatarComponent,
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <h1 class="docs-page__title">{{ i18n.t('loading.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('loading.description') }}</p>

        <!-- Live Demo -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <div class="demo-row demo-row--align-center">
              <dga-spinner size="md" />
              <dga-progress-bar [value]="60" [showLabel]="true" color="primary" style="flex: 1;" />
            </div>
          </div>
        </app-code-preview>

        <!-- Spinner Sizes -->
        <app-section-header
          [title]="i18n.t('loading.spinnerSizes.title')"
          [description]="i18n.t('loading.spinnerSizes.desc')"
          anchorId="spinner-sizes"
        />
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-spinner size="sm" />
            <dga-spinner size="md" />
            <dga-spinner size="lg" />
          </div>
        </div>

        <!-- Spinner Colors -->
        <app-section-header
          [title]="i18n.t('loading.spinnerColors.title')"
          [description]="i18n.t('loading.spinnerColors.desc')"
          anchorId="spinner-colors"
        />
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-spinner color="primary" />
            <dga-spinner color="secondary" />
            <dga-spinner color="neutral" />
          </div>
        </div>

        <!-- Progress Bar -->
        <app-section-header
          [title]="i18n.t('loading.progressDeterminate.title')"
          [description]="i18n.t('loading.progressDeterminate.desc')"
          anchorId="progress-bar"
        />
        <div class="demo-preview">
          <div class="demo-stack">
            <dga-progress-bar [value]="25" [showLabel]="true" color="primary" />
            <dga-progress-bar [value]="50" [showLabel]="true" color="success" />
            <dga-progress-bar [value]="75" [showLabel]="true" color="warning" />
            <dga-progress-bar [value]="100" [showLabel]="true" color="danger" />
          </div>
        </div>

        <!-- Progress Indeterminate -->
        <app-section-header
          [title]="i18n.t('loading.progressIndeterminate.title')"
          [description]="i18n.t('loading.progressIndeterminate.desc')"
          anchorId="progress-indeterminate"
        />
        <div class="demo-preview">
          <dga-progress-bar [indeterminate]="true" color="primary" />
        </div>

        <!-- Skeleton -->
        <app-section-header
          [title]="i18n.t('loading.skeleton.title')"
          [description]="i18n.t('loading.skeleton.desc')"
          anchorId="skeleton"
        />
        <div class="demo-preview">
          <div class="demo-stack">
            <dga-skeleton type="line" width="100%" />
            <dga-skeleton type="line" width="80%" />
            <dga-skeleton type="line" width="60%" />
            <div class="demo-row">
              <dga-skeleton type="circle" width="48px" height="48px" />
              <div class="demo-stack" style="flex: 1;">
                <dga-skeleton type="line" width="40%" />
                <dga-skeleton type="line" width="70%" />
              </div>
            </div>
            <dga-skeleton type="rectangle" width="100%" height="200px" />
          </div>
        </div>

        <!-- Avatar Initials -->
        <app-section-header
          [title]="i18n.t('loading.avatarInitials.title')"
          [description]="i18n.t('loading.avatarInitials.desc')"
          anchorId="avatar-initials"
        />
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-avatar type="initials" initials="OA" [size]="32" />
            <dga-avatar type="initials" initials="SM" [size]="40" />
            <dga-avatar type="initials" initials="KO" [size]="48" />
            <dga-avatar type="initials" initials="FH" [size]="64" />
          </div>
        </div>

        <!-- Avatar Icon -->
        <app-section-header
          [title]="i18n.t('loading.avatarIcon.title')"
          [description]="i18n.t('loading.avatarIcon.desc')"
          anchorId="avatar-icon"
        />
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-avatar type="icon" [size]="32" />
            <dga-avatar type="icon" [size]="40" />
            <dga-avatar type="icon" [size]="48" shape="square" />
            <dga-avatar type="icon" [size]="64" shape="square" />
          </div>
        </div>

        <!-- Accessibility -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>Spinners use role=status for screen readers</li>
            <li>Progress bars announce value via aria-valuenow</li>
            <li>Skeleton indicates loading via aria-busy</li>
            <li>Avatars provide accessible alt text</li>
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
export class LoadingComponent {
  readonly i18n = inject(TranslationService);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Spinner Sizes', anchorId: 'spinner-sizes' },
    { label: 'Spinner Colors', anchorId: 'spinner-colors' },
    { label: 'Progress Bar', anchorId: 'progress-bar' },
    { label: 'Progress Indeterminate', anchorId: 'progress-indeterminate' },
    { label: 'Skeleton', anchorId: 'skeleton' },
    { label: 'Avatar Initials', anchorId: 'avatar-initials' },
    { label: 'Avatar Icon', anchorId: 'avatar-icon' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaSpinnerComponent, DgaProgressBarComponent } from 'dga-components';

@Component({
  imports: [DgaSpinnerComponent, DgaProgressBarComponent],
  template: \`
    <dga-spinner size="md" />
    <dga-progress-bar [value]="60" [showLabel]="true" color="primary" />
  \`
})`;
}
