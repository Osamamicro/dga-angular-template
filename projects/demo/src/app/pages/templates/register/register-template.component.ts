import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DgaInputComponent,
  DgaButtonComponent,
  DgaCheckboxComponent,
} from 'dga-components';

@Component({
  selector: 'app-register-template',
  standalone: true,
  imports: [DgaInputComponent, DgaButtonComponent, DgaCheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="register-page">
      <div class="register-card">
        <h1 class="register-card__title">&#1573;&#1606;&#1588;&#1575;&#1569; &#1581;&#1587;&#1575;&#1576;</h1>
        <p class="register-card__subtitle">&#1571;&#1606;&#1588;&#1574; &#1581;&#1587;&#1575;&#1576;&#1603; &#1575;&#1604;&#1580;&#1583;&#1610;&#1583; &#1604;&#1604;&#1576;&#1583;&#1569;</p>

        <div class="register-card__form">
          <dga-input
            type="text"
            label="&#1575;&#1604;&#1575;&#1587;&#1605; &#1575;&#1604;&#1603;&#1575;&#1605;&#1604;"
            placeholder="&#1571;&#1583;&#1582;&#1604; &#1575;&#1587;&#1605;&#1603; &#1575;&#1604;&#1603;&#1575;&#1605;&#1604;"
          />

          <dga-input
            type="email"
            label="&#1575;&#1604;&#1576;&#1585;&#1610;&#1583; &#1575;&#1604;&#1573;&#1604;&#1603;&#1578;&#1585;&#1608;&#1606;&#1610;"
            placeholder="name@example.com"
          />

          <dga-input
            type="password"
            label="&#1603;&#1604;&#1605;&#1577; &#1575;&#1604;&#1605;&#1585;&#1608;&#1585;"
            placeholder="&#1571;&#1583;&#1582;&#1604; &#1603;&#1604;&#1605;&#1577; &#1575;&#1604;&#1605;&#1585;&#1608;&#1585;"
          />

          <dga-input
            type="password"
            label="&#1578;&#1571;&#1603;&#1610;&#1583; &#1603;&#1604;&#1605;&#1577; &#1575;&#1604;&#1605;&#1585;&#1608;&#1585;"
            placeholder="&#1571;&#1593;&#1583; &#1573;&#1583;&#1582;&#1575;&#1604; &#1603;&#1604;&#1605;&#1577; &#1575;&#1604;&#1605;&#1585;&#1608;&#1585;"
          />

          <dga-checkbox label="&#1571;&#1608;&#1575;&#1601;&#1602; &#1593;&#1604;&#1609; &#1575;&#1604;&#1588;&#1585;&#1608;&#1591; &#1608;&#1575;&#1604;&#1571;&#1581;&#1603;&#1575;&#1605;" />

          <div class="register-card__actions">
            <dga-button variant="primary" [fullWidth]="true">
              &#1573;&#1606;&#1588;&#1575;&#1569; &#1581;&#1587;&#1575;&#1576;
            </dga-button>
          </div>

          <div class="register-card__footer">
            <span class="register-card__text">&#1604;&#1583;&#1610;&#1603; &#1581;&#1587;&#1575;&#1576; &#1576;&#1575;&#1604;&#1601;&#1593;&#1604;&#1567;</span>
            <a href="#" class="register-card__link">&#1578;&#1587;&#1580;&#1610;&#1604; &#1575;&#1604;&#1583;&#1582;&#1608;&#1604;</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .register-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: var(--dga-spacing-lg);
      background-color: var(--dga-neutral-color-50);
    }

    .register-card {
      width: 100%;
      max-width: 480px;
      background: #fff;
      border-radius: var(--dga-radius-lg);
      box-shadow: var(--dga-shadow-md);
      padding: var(--dga-spacing-2xl);
    }

    .register-card__title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900);
      margin: 0 0 var(--dga-spacing-xs);
    }

    .register-card__subtitle {
      text-align: center;
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500);
      margin: 0 0 var(--dga-spacing-xl);
    }

    .register-card__form {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-md);
    }

    .register-card__actions {
      margin-top: var(--dga-spacing-sm);
    }

    .register-card__footer {
      text-align: center;
      margin-top: var(--dga-spacing-sm);
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500);
    }

    .register-card__text {
      margin-inline-end: var(--dga-spacing-xs);
    }

    .register-card__link {
      color: var(--dga-primary-color-600);
      text-decoration: none;
    }

    .register-card__link:hover {
      text-decoration: underline;
    }
  `,
})
export class RegisterTemplateComponent {}
