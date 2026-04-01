import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DgaInputComponent, DgaButtonComponent } from 'dga-components';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [DgaInputComponent, DgaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-card__logo">
          <div class="login-card__logo-placeholder" aria-hidden="true">
            <span>LOGO</span>
          </div>
        </div>

        <h1 class="login-card__title">&#1578;&#1587;&#1580;&#1610;&#1604; &#1575;&#1604;&#1583;&#1582;&#1608;&#1604;</h1>

        <div class="login-card__form">
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

          <div class="login-card__actions">
            <dga-button variant="primary" [fullWidth]="true">
              &#1578;&#1587;&#1580;&#1610;&#1604; &#1575;&#1604;&#1583;&#1582;&#1608;&#1604;
            </dga-button>
          </div>

          <div class="login-card__footer">
            <a href="#" class="login-card__link">&#1607;&#1604; &#1606;&#1587;&#1610;&#1578; &#1603;&#1604;&#1605;&#1577; &#1575;&#1604;&#1605;&#1585;&#1608;&#1585;&#1567;</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .login-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: var(--dga-spacing-lg);
      background-color: var(--dga-neutral-color-50);
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      background: #fff;
      border-radius: var(--dga-radius-lg);
      box-shadow: var(--dga-shadow-md);
      padding: var(--dga-spacing-2xl);
    }

    .login-card__logo {
      display: flex;
      justify-content: center;
      margin-bottom: var(--dga-spacing-xl);
    }

    .login-card__logo-placeholder {
      width: 80px;
      height: 80px;
      border-radius: var(--dga-radius-md);
      background-color: var(--dga-primary-color-50);
      color: var(--dga-primary-color-600);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.05em;
    }

    .login-card__title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900);
      margin: 0 0 var(--dga-spacing-xl);
    }

    .login-card__form {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-md);
    }

    .login-card__actions {
      margin-top: var(--dga-spacing-sm);
    }

    .login-card__footer {
      text-align: center;
      margin-top: var(--dga-spacing-sm);
    }

    .login-card__link {
      color: var(--dga-primary-color-600);
      font-size: 0.875rem;
      text-decoration: none;
    }

    .login-card__link:hover {
      text-decoration: underline;
    }
  `,
})
export class LoginTemplateComponent {}
