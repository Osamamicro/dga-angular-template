import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DgaStepperComponent,
  DgaStepComponent,
  DgaInputComponent,
  DgaCardComponent,
  DgaButtonComponent,
} from 'dga-components';

@Component({
  selector: 'app-form-wizard-template',
  standalone: true,
  imports: [
    DgaStepperComponent,
    DgaStepComponent,
    DgaInputComponent,
    DgaCardComponent,
    DgaButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <h1 class="demo-page__title">Create User — Wizard</h1>

      <dga-stepper [activeStep]="activeStep()" [clickable]="false">
        <dga-step label="Personal Info" description="Name and identification" />
        <dga-step label="Contact" description="Email and phone" />
        <dga-step label="Review" description="Review and submit" />
      </dga-stepper>

      <div class="wizard-content">
        @if (activeStep() === 0) {
          <div class="step-form">
            <dga-input
              type="text"
              label="Full Name"
              placeholder="Enter full name"
            />
            <dga-input
              type="text"
              label="ID Number"
              placeholder="Enter national ID number"
            />
          </div>
        }

        @if (activeStep() === 1) {
          <div class="step-form">
            <dga-input
              type="email"
              label="Email"
              placeholder="name@example.com"
            />
            <dga-input
              type="text"
              label="Phone"
              placeholder="+966 5X XXX XXXX"
            />
          </div>
        }

        @if (activeStep() === 2) {
          <dga-card variant="outlined">
            <h3 class="summary-title">Summary</h3>
            <div class="summary-grid">
              <div class="summary-item">
                <span class="summary-label">Full Name</span>
                <span class="summary-value">Ahmed Ali</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">ID Number</span>
                <span class="summary-value">1234567890</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Email</span>
                <span class="summary-value">ahmed@example.com</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Phone</span>
                <span class="summary-value">+966 50 123 4567</span>
              </div>
            </div>
          </dga-card>
        }
      </div>

      <div class="wizard-actions">
        @if (activeStep() > 0) {
          <dga-button variant="outline" (click)="previousStep()">Previous</dga-button>
        }
        <div class="wizard-actions__spacer"></div>
        @if (activeStep() < 2) {
          <dga-button variant="primary" (click)="nextStep()">Next</dga-button>
        }
        @if (activeStep() === 2) {
          <dga-button variant="primary">Submit</dga-button>
        }
      </div>
    </div>
  `,
  styles: `
    .wizard-content {
      margin-top: var(--dga-spacing-xl);
    }
    .step-form {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .wizard-actions {
      display: flex;
      align-items: center;
      gap: var(--dga-spacing-sm);
      margin-top: var(--dga-spacing-xl);
      padding-top: var(--dga-spacing-lg);
      border-top: 1px solid var(--dga-neutral-color-200);
    }
    .wizard-actions__spacer {
      flex: 1;
    }
    .summary-title {
      margin: 0 0 var(--dga-spacing-md);
      font-size: 1.125rem;
      font-weight: 600;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--dga-spacing-md);
    }
    .summary-item {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-2xs);
    }
    .summary-label {
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500);
    }
    .summary-value {
      font-size: 1rem;
      color: var(--dga-neutral-color-900);
      font-weight: 500;
    }
  `,
})
export class FormWizardTemplateComponent {
  readonly activeStep = signal(0);

  nextStep(): void {
    if (this.activeStep() < 2) {
      this.activeStep.update(step => step + 1);
    }
  }

  previousStep(): void {
    if (this.activeStep() > 0) {
      this.activeStep.update(step => step - 1);
    }
  }
}
