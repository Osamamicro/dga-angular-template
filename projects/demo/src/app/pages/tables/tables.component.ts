import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import {
  DgaTableComponent,
  DgaPaginationComponent,
} from 'dga-components';
import type { DgaTableColumn } from 'dga-components';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [DgaTableComponent, DgaPaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page" dir="rtl">
      <header class="demo-page__header">
        <h1 class="demo-page__title-ar">{{ i18n.t('tables.pageTitle') }}</h1>
        @if (i18n.t('tables.pageSubtitle')) {
          <p class="demo-page__title-en">{{ i18n.t('tables.pageSubtitle') }}</p>
        }
      </header>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('tables.default.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('tables.default.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-table
            [columns]="columns"
            [data]="data"
          />
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('tables.striped.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('tables.striped.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-table
            [columns]="columns"
            [data]="data"
            variant="striped"
          />
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('tables.selectable.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('tables.selectable.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-table
            [columns]="columns"
            [data]="data"
            [selectable]="true"
          />
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__header">
          <h2 class="demo-section__title">{{ i18n.t('tables.pagination.title') }}</h2>
          <p class="demo-section__description">{{ i18n.t('tables.pagination.desc') }}</p>
        </div>
        <div class="demo-preview">
          <dga-pagination
            [totalItems]="100"
            [pageSize]="10"
            [currentPage]="1"
          />
        </div>
      </section>
    </div>
  `,
})
export class TablesComponent {
  readonly i18n = inject(TranslationService);

  readonly columns: DgaTableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
  ];

  readonly data: Record<string, unknown>[] = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sara Mohammed', email: 'sara@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Khalid Omar', email: 'khalid@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Fatima Hassan', email: 'fatima@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Nora Abdullah', email: 'nora@example.com', role: 'Admin', status: 'Active' },
  ];
}
