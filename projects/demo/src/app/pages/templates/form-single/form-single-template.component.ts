import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DgaBreadcrumbComponent,
  DgaBreadcrumbItemComponent,
  DgaCardComponent,
  DgaInputComponent,
  DgaSelectComponent,
  DgaSwitchComponent,
  DgaButtonComponent,
} from 'dga-components';
import type { DgaSelectOption } from 'dga-components';

@Component({
  selector: 'app-form-single-template',
  standalone: true,
  imports: [
    DgaBreadcrumbComponent,
    DgaBreadcrumbItemComponent,
    DgaCardComponent,
    DgaInputComponent,
    DgaSelectComponent,
    DgaSwitchComponent,
    DgaButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <dga-breadcrumb>
        <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/templates/data-list">Users</dga-breadcrumb-item>
        <dga-breadcrumb-item [active]="true">Create User</dga-breadcrumb-item>
      </dga-breadcrumb>

      <h1 class="demo-page__title">Create User</h1>

      <dga-card variant="outlined">
        <div class="form-grid">
          <dga-input
            type="text"
            label="Full Name"
            placeholder="Enter full name"
          />
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
          <dga-select
            label="Role"
            placeholder="Select a role"
            [options]="roleOptions"
          />
        </div>

        <div class="switch-row">
          <dga-switch label="Active" />
        </div>

        <div class="form-actions">
          <dga-button variant="outline">Cancel</dga-button>
          <dga-button variant="primary">Save</dga-button>
        </div>
      </dga-card>
    </div>
  `,
  styles: `
    .demo-page__title {
      margin-top: var(--dga-spacing-lg);
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--dga-spacing-lg);
    }
    .switch-row {
      margin-top: var(--dga-spacing-lg);
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--dga-spacing-sm);
      margin-top: var(--dga-spacing-xl);
      padding-top: var(--dga-spacing-lg);
      border-top: 1px solid var(--dga-neutral-color-200);
    }
  `,
})
export class FormSingleTemplateComponent {
  readonly roleOptions: DgaSelectOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];
}
