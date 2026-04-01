import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DgaBreadcrumbComponent,
  DgaBreadcrumbItemComponent,
  DgaButtonComponent,
  DgaCardComponent,
  DgaTagComponent,
} from 'dga-components';

@Component({
  selector: 'app-detail-view-template',
  standalone: true,
  imports: [
    DgaBreadcrumbComponent,
    DgaBreadcrumbItemComponent,
    DgaButtonComponent,
    DgaCardComponent,
    DgaTagComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <dga-breadcrumb>
        <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/templates/data-list">Users</dga-breadcrumb-item>
        <dga-breadcrumb-item [active]="true">User Detail</dga-breadcrumb-item>
      </dga-breadcrumb>

      <div class="page-header">
        <div class="page-header__title-row">
          <h1 class="demo-page__title">User Detail</h1>
          <dga-tag color="success">Active</dga-tag>
        </div>
        <div class="page-header__actions">
          <dga-button variant="outline">Edit</dga-button>
          <dga-button variant="danger">Delete</dga-button>
        </div>
      </div>

      <div class="detail-sections">
        <dga-card variant="outlined">
          <h3 class="section-title">Personal Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Full Name</span>
              <span class="info-value">Ahmed Ali</span>
            </div>
            <div class="info-item">
              <span class="info-label">ID Number</span>
              <span class="info-value">1234567890</span>
            </div>
            <div class="info-item">
              <span class="info-label">Date of Birth</span>
              <span class="info-value">1990-05-15</span>
            </div>
            <div class="info-item">
              <span class="info-label">Role</span>
              <span class="info-value">Administrator</span>
            </div>
          </div>
        </dga-card>

        <dga-card variant="outlined">
          <h3 class="section-title">Contact Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">ahmed@example.com</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone</span>
              <span class="info-value">+966 50 123 4567</span>
            </div>
            <div class="info-item">
              <span class="info-label">City</span>
              <span class="info-value">Riyadh</span>
            </div>
            <div class="info-item">
              <span class="info-label">Address</span>
              <span class="info-value">King Fahd Road, Building 42</span>
            </div>
          </div>
        </dga-card>
      </div>
    </div>
  `,
  styles: `
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--dga-spacing-lg);
      margin-bottom: var(--dga-spacing-lg);
    }
    .page-header__title-row {
      display: flex;
      align-items: center;
      gap: var(--dga-spacing-sm);
    }
    .page-header__title-row .demo-page__title {
      margin: 0;
    }
    .page-header__actions {
      display: flex;
      gap: var(--dga-spacing-sm);
    }
    .detail-sections {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-lg);
    }
    .section-title {
      margin: 0 0 var(--dga-spacing-md);
      font-size: 1.125rem;
      font-weight: 600;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--dga-spacing-md);
    }
    .info-item {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-2xs);
    }
    .info-label {
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500);
    }
    .info-value {
      font-size: 1rem;
      color: var(--dga-neutral-color-900);
      font-weight: 500;
    }
  `,
})
export class DetailViewTemplateComponent {}
