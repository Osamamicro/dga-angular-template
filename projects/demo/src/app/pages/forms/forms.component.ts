import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { TranslationService } from '../../i18n/translation.service';

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
      <header class="demo-page__header">
        <h1 class="demo-page__title-ar">{{ i18n.t('forms.pageTitle') }}</h1>
        @if (i18n.t('forms.pageSubtitle')) {
          <p class="demo-page__title-en">{{ i18n.t('forms.pageSubtitle') }}</p>
        }
      </header>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.input.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.input.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-form-grid">
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
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.textarea.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.textarea.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-textarea
            label="Description"
            placeholder="Enter a description..."
            helperText="Maximum 500 characters"
            [maxLength]="500"
          />
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.select.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.select.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-form-grid">
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
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.checkbox.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.checkbox.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-checkbox label="Accept terms and conditions" />
            <dga-checkbox label="Subscribe to newsletter" />
            <dga-checkbox label="Indeterminate" [indeterminate]="true" />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.radio.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.radio.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-radio-group name="plan">
            <dga-radio value="basic" label="Basic Plan" />
            <dga-radio value="pro" label="Pro Plan" />
            <dga-radio value="enterprise" label="Enterprise Plan" />
          </dga-radio-group>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.switch.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.switch.desc') }}</p>
        </div>
        <div class="demo-preview">
          <div class="demo-row">
            <dga-switch label="Enable notifications" />
            <dga-switch label="Dark mode" />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.datepicker.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.datepicker.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-datepicker
            label="Start Date"
            placeholder="Select a date"
          />
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('forms.fileUpload.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('forms.fileUpload.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-file-upload
            label="Upload Documents"
            helperText="Accepted formats: PDF, DOCX. Max 10MB."
            accept=".pdf,.docx"
          />
        </div>
      </section>
    </div>
  `,
  styles: ``,
})
export class FormsComponent {
  readonly i18n = inject(TranslationService);
  readonly cityOptions: DgaSelectOption[] = [
    { label: 'Riyadh', value: 'riyadh' },
    { label: 'Jeddah', value: 'jeddah' },
    { label: 'Dammam', value: 'dammam' },
    { label: 'Makkah', value: 'makkah' },
    { label: 'Madinah', value: 'madinah' },
  ];
}
