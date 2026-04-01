import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DgaCardComponent,
  DgaSwitchComponent,
  DgaInputComponent,
  DgaTextareaComponent,
  DgaSelectComponent,
  DgaButtonComponent,
} from 'dga-components';
import type { DgaSelectOption } from 'dga-components';

@Component({
  selector: 'app-settings-template',
  standalone: true,
  imports: [
    DgaCardComponent,
    DgaSwitchComponent,
    DgaInputComponent,
    DgaTextareaComponent,
    DgaSelectComponent,
    DgaButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <h1 class="demo-page__title">Settings</h1>

      <div class="settings-sections">
        <dga-card variant="outlined">
          <h3 class="section-title">Notifications</h3>
          <div class="switches-list">
            <dga-switch label="Email notifications" />
            <dga-switch label="Push notifications" />
            <dga-switch label="SMS alerts" />
          </div>
        </dga-card>

        <dga-card variant="outlined">
          <h3 class="section-title">Profile</h3>
          <div class="form-grid">
            <dga-input
              type="text"
              label="Display Name"
              placeholder="Enter display name"
            />
          </div>
          <div class="textarea-field">
            <dga-textarea
              label="Bio"
              placeholder="Write a short bio..."
              [maxLength]="300"
            />
          </div>
        </dga-card>

        <dga-card variant="outlined">
          <h3 class="section-title">Language</h3>
          <div class="form-grid">
            <dga-select
              label="Language"
              placeholder="Select language"
              [options]="languageOptions"
            />
          </div>
        </dga-card>
      </div>

      <div class="page-actions">
        <dga-button variant="primary">Save Changes</dga-button>
      </div>
    </div>
  `,
  styles: `
    .settings-sections {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-lg);
    }
    .section-title {
      margin: 0 0 var(--dga-spacing-md);
      font-size: 1.125rem;
      font-weight: 600;
    }
    .switches-list {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-md);
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .textarea-field {
      margin-top: var(--dga-spacing-lg);
    }
    .page-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--dga-spacing-xl);
      padding-top: var(--dga-spacing-lg);
      border-top: 1px solid var(--dga-neutral-color-200);
    }
  `,
})
export class SettingsTemplateComponent {
  readonly languageOptions: DgaSelectOption[] = [
    { label: 'Arabic', value: 'ar' },
    { label: 'English', value: 'en' },
  ];
}
