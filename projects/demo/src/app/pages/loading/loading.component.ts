import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      <h1 class="demo-page__title">Loading &amp; Avatars</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Spinner — Sizes</h2>
        <div class="demo-section__content demo-row demo-row--align-center">
          <dga-spinner size="sm" />
          <dga-spinner size="md" />
          <dga-spinner size="lg" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Spinner — Colors</h2>
        <div class="demo-section__content demo-row demo-row--align-center">
          <dga-spinner color="primary" />
          <dga-spinner color="secondary" />
          <dga-spinner color="neutral" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Progress Bar — Determinate</h2>
        <div class="demo-section__content demo-stack">
          <dga-progress-bar [value]="25" [showLabel]="true" color="primary" />
          <dga-progress-bar [value]="50" [showLabel]="true" color="success" />
          <dga-progress-bar [value]="75" [showLabel]="true" color="warning" />
          <dga-progress-bar [value]="100" [showLabel]="true" color="danger" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Progress Bar — Indeterminate</h2>
        <div class="demo-section__content">
          <dga-progress-bar [indeterminate]="true" color="primary" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Skeleton</h2>
        <div class="demo-section__content demo-stack">
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
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Avatar — Initials</h2>
        <div class="demo-section__content demo-row demo-row--align-center">
          <dga-avatar type="initials" initials="OA" [size]="32" />
          <dga-avatar type="initials" initials="SM" [size]="40" />
          <dga-avatar type="initials" initials="KO" [size]="48" />
          <dga-avatar type="initials" initials="FH" [size]="64" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Avatar — Icon</h2>
        <div class="demo-section__content demo-row demo-row--align-center">
          <dga-avatar type="icon" [size]="32" />
          <dga-avatar type="icon" [size]="40" />
          <dga-avatar type="icon" [size]="48" shape="square" />
          <dga-avatar type="icon" [size]="64" shape="square" />
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
    .demo-stack {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-sm);
    }
  `,
})
export class LoadingComponent {}
