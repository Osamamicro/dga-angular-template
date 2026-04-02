import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DgaTableComponent,
  DgaPaginationComponent,
} from 'dga-components';
import type { DgaTableColumn } from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    DgaTableComponent,
    DgaPaginationComponent,
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <h1 class="docs-page__title">{{ i18n.t('tables.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('tables.description') }}</p>

        <!-- Live Demo -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <dga-table [columns]="columns" [data]="data" />
          </div>
        </app-code-preview>

        <!-- Default Table -->
        <app-section-header
          [title]="i18n.t('tables.default.title')"
          [description]="i18n.t('tables.default.desc')"
          anchorId="default-table"
        />
        <div class="demo-preview">
          <dga-table [columns]="columns" [data]="data" />
        </div>

        <!-- Striped Table -->
        <app-section-header
          [title]="i18n.t('tables.striped.title')"
          [description]="i18n.t('tables.striped.desc')"
          anchorId="striped-table"
        />
        <div class="demo-preview">
          <dga-table [columns]="columns" [data]="data" variant="striped" />
        </div>

        <!-- Selectable Table -->
        <app-section-header
          [title]="i18n.t('tables.selectable.title')"
          [description]="i18n.t('tables.selectable.desc')"
          anchorId="selectable-table"
        />
        <div class="demo-preview">
          <dga-table [columns]="columns" [data]="data" [selectable]="true" />
        </div>

        <!-- Pagination -->
        <app-section-header
          [title]="i18n.t('tables.pagination.title')"
          [description]="i18n.t('tables.pagination.desc')"
          anchorId="pagination"
        />
        <div class="demo-preview">
          <dga-pagination [totalItems]="100" [pageSize]="10" [currentPage]="1" />
        </div>

        <!-- Accessibility -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>Tables use proper th/td semantics</li>
            <li>Sortable columns announced via aria-sort</li>
            <li>Selectable rows use checkbox with aria-label</li>
            <li>Pagination announces page changes</li>
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
export class TablesComponent {
  readonly i18n = inject(TranslationService);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Default Table', anchorId: 'default-table' },
    { label: 'Striped Table', anchorId: 'striped-table' },
    { label: 'Selectable Table', anchorId: 'selectable-table' },
    { label: 'Pagination', anchorId: 'pagination' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaTableComponent } from 'dga-components';
import type { DgaTableColumn } from 'dga-components';

@Component({
  imports: [DgaTableComponent],
  template: \`
    <dga-table [columns]="columns" [data]="data" />
  \`
})
export class MyComponent {
  columns: DgaTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ];
  data = [
    { name: 'Ahmed', email: 'ahmed@example.com' },
  ];
}`;

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
