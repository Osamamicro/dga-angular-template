import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import {
  DgaSpinnerComponent,
  DgaProgressBarComponent,
  DgaSkeletonComponent,
  DgaAvatarComponent,
} from 'dga-components';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    DgaSpinnerComponent,
    DgaProgressBarComponent,
    DgaSkeletonComponent,
    DgaAvatarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <header class="demo-page__header">
        <h1 class="demo-page__title-ar">{{ i18n.t('loading.pageTitle') }}</h1>
        @if (i18n.t('loading.pageSubtitle')) {
          <p class="demo-page__title-en">{{ i18n.t('loading.pageSubtitle') }}</p>
        }
      </header>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.spinnerSizes.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.spinnerSizes.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-spinner size="sm" />
            <dga-spinner size="md" />
            <dga-spinner size="lg" />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.spinnerColors.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.spinnerColors.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-spinner color="primary" />
            <dga-spinner color="secondary" />
            <dga-spinner color="neutral" />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.progressDeterminate.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.progressDeterminate.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-stack">
            <dga-progress-bar [value]="25" [showLabel]="true" color="primary" />
            <dga-progress-bar [value]="50" [showLabel]="true" color="success" />
            <dga-progress-bar [value]="75" [showLabel]="true" color="warning" />
            <dga-progress-bar [value]="100" [showLabel]="true" color="danger" />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.progressIndeterminate.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.progressIndeterminate.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-progress-bar [indeterminate]="true" color="primary" />
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.skeleton.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.skeleton.desc') }}</p>
        </div>
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
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.avatarInitials.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.avatarInitials.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-avatar type="initials" initials="OA" [size]="32" />
            <dga-avatar type="initials" initials="SM" [size]="40" />
            <dga-avatar type="initials" initials="KO" [size]="48" />
            <dga-avatar type="initials" initials="FH" [size]="64" />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('loading.avatarIcon.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('loading.avatarIcon.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row demo-row--align-center">
            <dga-avatar type="icon" [size]="32" />
            <dga-avatar type="icon" [size]="40" />
            <dga-avatar type="icon" [size]="48" shape="square" />
            <dga-avatar type="icon" [size]="64" shape="square" />
          </div>
        </div>
      </section>
    </div>
  `,
})
export class LoadingComponent {
  readonly i18n = inject(TranslationService);
}
