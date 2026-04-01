import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DgaInputComponent,
  DgaTextareaComponent,
  DgaSelectComponent,
  DgaCheckboxComponent,
  DgaRadioGroupComponent,
  DgaRadioComponent,
  DgaSwitchComponent,
  DgaDatepickerComponent,
  DgaFileUploadComponent,
} from 'dga-components';
import type { DgaSelectOption } from 'dga-components';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    DgaInputComponent,
    DgaTextareaComponent,
    DgaSelectComponent,
    DgaCheckboxComponent,
    DgaRadioGroupComponent,
    DgaRadioComponent,
    DgaSwitchComponent,
    DgaDatepickerComponent,
    DgaFileUploadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <h1 class="demo-page__title">Forms</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Input</h2>
        <div class="demo-section__content demo-form-grid">
          <dga-input
            type="text"
            label="Full Name"
            placeholder="Enter your name"
            helperText="Your legal full name"
          />
          <dga-input
            type="email"
            label="Email"
            placeholder="name@example.com"
            helperText="We will not share your email"
          />
          <dga-input
            type="password"
            label="Password"
            placeholder="Enter password"
          />
          <dga-input
            type="text"
            label="With Error"
            placeholder="Invalid input"
            errorMessage="This field is required"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Textarea</h2>
        <div class="demo-section__content demo-form-grid">
          <dga-textarea
            label="Description"
            placeholder="Enter a description..."
            helperText="Maximum 500 characters"
            [maxLength]="500"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Select</h2>
        <div class="demo-section__content demo-form-grid">
          <dga-select
            label="City"
            placeholder="Select a city"
            [options]="cityOptions"
            helperText="Choose your city"
          />
          <dga-select
            label="Searchable City"
            placeholder="Search cities..."
            [options]="cityOptions"
            [searchable]="true"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Checkbox</h2>
        <div class="demo-section__content demo-row">
          <dga-checkbox label="Accept terms and conditions" />
          <dga-checkbox label="Subscribe to newsletter" />
          <dga-checkbox label="Indeterminate" [indeterminate]="true" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Radio Group</h2>
        <div class="demo-section__content">
          <dga-radio-group name="plan">
            <dga-radio value="basic" label="Basic Plan" />
            <dga-radio value="pro" label="Pro Plan" />
            <dga-radio value="enterprise" label="Enterprise Plan" />
          </dga-radio-group>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Switch</h2>
        <div class="demo-section__content demo-row">
          <dga-switch label="Enable notifications" />
          <dga-switch label="Dark mode" />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Datepicker</h2>
        <div class="demo-section__content demo-form-grid">
          <dga-datepicker
            label="Start Date"
            placeholder="Select a date"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">File Upload</h2>
        <div class="demo-section__content">
          <dga-file-upload
            label="Upload Documents"
            helperText="Accepted formats: PDF, DOCX. Max 10MB."
            accept=".pdf,.docx"
          />
        </div>
      </section>
    </div>
  `,
  styles: `
    .demo-form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--dga-spacing-md);
    }
  `,
})
export class FormsComponent {
  readonly cityOptions: DgaSelectOption[] = [
    { label: 'Riyadh', value: 'riyadh' },
    { label: 'Jeddah', value: 'jeddah' },
    { label: 'Dammam', value: 'dammam' },
    { label: 'Makkah', value: 'makkah' },
    { label: 'Madinah', value: 'madinah' },
  ];
}
