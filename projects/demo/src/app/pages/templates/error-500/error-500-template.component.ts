import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DgaButtonComponent } from 'dga-components';

@Component({
  selector: 'app-error-500-template',
  standalone: true,
  imports: [DgaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-page">
      <div class="error-page__content">
        <span class="error-page__code">500</span>
        <h1 class="error-page__title">&#1582;&#1591;&#1571; &#1601;&#1610; &#1575;&#1604;&#1582;&#1575;&#1583;&#1605;</h1>
        <p class="error-page__message">&#1593;&#1584;&#1585;&#1575;&#1611;&#1548; &#1581;&#1583;&#1579; &#1582;&#1591;&#1571; &#1594;&#1610;&#1585; &#1605;&#1578;&#1608;&#1602;&#1593;. &#1610;&#1585;&#1580;&#1609; &#1575;&#1604;&#1605;&#1581;&#1575;&#1608;&#1604;&#1577; &#1605;&#1585;&#1577; &#1571;&#1582;&#1585;&#1609; &#1604;&#1575;&#1581;&#1602;&#1575;&#1611;.</p>
        <dga-button variant="primary" href="/">
          &#1575;&#1604;&#1593;&#1608;&#1583;&#1577; &#1604;&#1604;&#1585;&#1574;&#1610;&#1587;&#1610;&#1577;
        </dga-button>
      </div>
    </div>
  `,
  styles: `
    .error-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: var(--dga-spacing-lg);
      background-color: var(--dga-neutral-color-50);
    }

    .error-page__content {
      text-align: center;
    }

    .error-page__code {
      display: block;
      font-size: 8rem;
      font-weight: 800;
      line-height: 1;
      color: var(--dga-danger-color-600);
      margin-bottom: var(--dga-spacing-md);
    }

    .error-page__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900);
      margin: 0 0 var(--dga-spacing-sm);
    }

    .error-page__message {
      font-size: 1rem;
      color: var(--dga-neutral-color-500);
      margin: 0 0 var(--dga-spacing-xl);
      max-width: 400px;
    }
  `,
})
export class Error500TemplateComponent {}
