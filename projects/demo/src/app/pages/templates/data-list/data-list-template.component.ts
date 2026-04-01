import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DgaButtonComponent,
  DgaInputComponent,
  DgaTableComponent,
  DgaPaginationComponent,
} from 'dga-components';
import type { DgaTableColumn } from 'dga-components';

@Component({
  selector: 'app-data-list-template',
  standalone: true,
  imports: [
    DgaButtonComponent,
    DgaInputComponent,
    DgaTableComponent,
    DgaPaginationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <div class="page-header">
        <h1 class="demo-page__title">Users</h1>
        <dga-button variant="primary">Add New</dga-button>
      </div>

      <div class="search-bar">
        <dga-input
          type="text"
          placeholder="Search users..."
          label="Search"
        />
      </div>

      <dga-table
        [columns]="columns"
        [data]="data"
      />

      <div class="pagination-container">
        <dga-pagination
          [totalItems]="50"
          [pageSize]="10"
          [currentPage]="1"
        />
      </div>
    </div>
  `,
  styles: `
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--dga-spacing-lg);
    }
    .page-header .demo-page__title {
      margin: 0;
    }
    .search-bar {
      margin-bottom: var(--dga-spacing-lg);
      max-width: 400px;
    }
    .pagination-container {
      margin-top: var(--dga-spacing-lg);
      display: flex;
      justify-content: center;
    }
  `,
})
export class DataListTemplateComponent {
  readonly columns: DgaTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  readonly data: Record<string, unknown>[] = [
    { name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', status: 'Active', actions: '' },
    { name: 'Sara Mohammed', email: 'sara@example.com', role: 'Editor', status: 'Active', actions: '' },
    { name: 'Khalid Omar', email: 'khalid@example.com', role: 'Viewer', status: 'Inactive', actions: '' },
    { name: 'Fatima Hassan', email: 'fatima@example.com', role: 'Editor', status: 'Active', actions: '' },
    { name: 'Nora Abdullah', email: 'nora@example.com', role: 'Admin', status: 'Active', actions: '' },
  ];
}
