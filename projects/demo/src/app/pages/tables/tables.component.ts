import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    <div class="demo-page">
      <h1 class="demo-page__title">Tables &amp; Pagination</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Default Table (Sortable)</h2>
        <div class="demo-section__content">
          <dga-table
            [columns]="columns"
            [data]="data"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Striped Table</h2>
        <div class="demo-section__content">
          <dga-table
            [columns]="columns"
            [data]="data"
            variant="striped"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Selectable Table</h2>
        <div class="demo-section__content">
          <dga-table
            [columns]="columns"
            [data]="data"
            [selectable]="true"
          />
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Pagination</h2>
        <div class="demo-section__content">
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
