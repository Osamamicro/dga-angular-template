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
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
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
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <h1 class="docs-page__title">{{ i18n.t('forms.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('forms.description') }}</p>

        <!-- Live Demo -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <div class="demo-form-grid">
              <dga-input
                type="text"
                label="Full Name"
                placeholder="Enter your name"
                helperText="Your legal full name"
              />
              <dga-select
                label="City"
                placeholder="Select a city"
                [options]="cityOptions"
                helperText="Choose your city"
              />
            </div>
          </div>
        </app-code-preview>

        <!-- Input -->
        <app-section-header
          [title]="i18n.t('forms.input.title')"
          [description]="i18n.t('forms.input.desc')"
          anchorId="input"
        />
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

        <!-- Textarea -->
        <app-section-header
          [title]="i18n.t('forms.textarea.title')"
          [description]="i18n.t('forms.textarea.desc')"
          anchorId="textarea"
        />
        <div class="demo-preview">
          <dga-textarea
            label="Description"
            placeholder="Enter a description..."
            helperText="Maximum 500 characters"
            [maxLength]="500"
          />
        </div>

        <!-- Select -->
        <app-section-header
          [title]="i18n.t('forms.select.title')"
          [description]="i18n.t('forms.select.desc')"
          anchorId="select"
        />
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

        <!-- Checkbox -->
        <app-section-header
          [title]="i18n.t('forms.checkbox.title')"
          [description]="i18n.t('forms.checkbox.desc')"
          anchorId="checkbox"
        />
        <div class="demo-preview">
          <div class="demo-row">
            <dga-checkbox label="Accept terms and conditions" />
            <dga-checkbox label="Subscribe to newsletter" />
            <dga-checkbox label="Indeterminate" [indeterminate]="true" />
          </div>
        </div>

        <!-- Radio -->
        <app-section-header
          [title]="i18n.t('forms.radio.title')"
          [description]="i18n.t('forms.radio.desc')"
          anchorId="radio"
        />
        <div class="demo-preview">
          <dga-radio-group name="plan">
            <dga-radio value="basic" label="Basic Plan" />
            <dga-radio value="pro" label="Pro Plan" />
            <dga-radio value="enterprise" label="Enterprise Plan" />
          </dga-radio-group>
        </div>

        <!-- Switch -->
        <app-section-header
          [title]="i18n.t('forms.switch.title')"
          [description]="i18n.t('forms.switch.desc')"
          anchorId="switch"
        />
        <div class="demo-preview">
          <div class="demo-row">
            <dga-switch label="Enable notifications" />
            <dga-switch label="Dark mode" />
          </div>
        </div>

        <!-- Datepicker -->
        <app-section-header
          [title]="i18n.t('forms.datepicker.title')"
          [description]="i18n.t('forms.datepicker.desc')"
          anchorId="datepicker"
        />
        <div class="demo-preview">
          <dga-datepicker
            label="Start Date"
            placeholder="Select a date"
          />
        </div>

        <!-- File Upload -->
        <app-section-header
          [title]="i18n.t('forms.fileUpload.title')"
          [description]="i18n.t('forms.fileUpload.desc')"
          anchorId="file-upload"
        />
        <div class="demo-preview">
          <dga-file-upload
            label="Upload Documents"
            helperText="Accepted formats: PDF, DOCX. Max 10MB."
            accept=".pdf,.docx"
          />
        </div>

        <!-- Accessibility -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>Form controls have associated labels via label attribute</li>
            <li>Error messages are announced via aria-describedby</li>
            <li>All inputs support keyboard navigation</li>
            <li>Required fields indicated via aria-required</li>
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
export class FormsComponent {
  readonly i18n = inject(TranslationService);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Input', anchorId: 'input' },
    { label: 'Textarea', anchorId: 'textarea' },
    { label: 'Select', anchorId: 'select' },
    { label: 'Checkbox', anchorId: 'checkbox' },
    { label: 'Radio', anchorId: 'radio' },
    { label: 'Switch', anchorId: 'switch' },
    { label: 'Datepicker', anchorId: 'datepicker' },
    { label: 'File Upload', anchorId: 'file-upload' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaInputComponent, DgaSelectComponent } from 'dga-components';

@Component({
  imports: [DgaInputComponent, DgaSelectComponent],
  template: \`
    <dga-input
      type="text"
      label="Full Name"
      placeholder="Enter your name"
      helperText="Your legal full name"
    />
    <dga-select
      label="City"
      placeholder="Select a city"
      [options]="cityOptions"
    />
  \`
})`;

  readonly cityOptions: DgaSelectOption[] = [
    { label: 'Riyadh', value: 'riyadh' },
    { label: 'Jeddah', value: 'jeddah' },
    { label: 'Dammam', value: 'dammam' },
    { label: 'Makkah', value: 'makkah' },
    { label: 'Madinah', value: 'madinah' },
  ];
}
