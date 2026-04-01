import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  output,
} from '@angular/core';

export interface DgaTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export type DgaTableVariant = 'default' | 'striped' | 'compact' | 'bordered';

export interface DgaTableSortEvent {
  column: string;
  direction: 'asc' | 'desc' | 'none';
}

@Component({
  selector: 'dga-table',
  standalone: true,
  templateUrl: './dga-table.component.html',
  styleUrls: ['./dga-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaTableComponent {
  /** Column definitions */
  columns = input<DgaTableColumn[]>([]);

  /** Row data */
  data = input<Record<string, unknown>[]>([]);

  /** Table visual variant */
  variant = input<DgaTableVariant>('default');

  /** Whether rows are selectable */
  selectable = input<boolean>(false);

  /** Whether the header is sticky */
  stickyHeader = input<boolean>(false);

  /** Current sort column key */
  sortColumn = signal<string>('');

  /** Current sort direction */
  sortDirection = signal<'asc' | 'desc' | 'none'>('none');

  /** Set of selected row indices */
  selectedRows = signal<Set<number>>(new Set());

  /** Emits when sort state changes */
  sortChange = output<DgaTableSortEvent>();

  /** Emits when selection changes */
  selectionChange = output<Set<number>>();

  /** Computed CSS classes for the table element */
  tableClasses = computed(() => {
    const classes = ['dga-table'];
    const v = this.variant();
    if (v !== 'default') {
      classes.push(`dga-table--${v}`);
    }
    if (this.stickyHeader()) {
      classes.push('dga-table--sticky');
    }
    return classes.join(' ');
  });

  /** Computed sorted data */
  sortedData = computed(() => {
    const rows = this.data();
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col || dir === 'none') {
      return rows;
    }

    return [...rows].sort((a, b) => {
      const aVal = a[col];
      const bVal = b[col];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return dir === 'asc' ? -1 : 1;
      if (bVal == null) return dir === 'asc' ? 1 : -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return dir === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      const cmp = aStr.localeCompare(bStr);
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  /** Whether all visible rows are selected */
  allSelected = computed(() => {
    const rows = this.sortedData();
    const selected = this.selectedRows();
    return rows.length > 0 && selected.size === rows.length;
  });

  /** Toggle sort for a column */
  toggleSort(columnKey: string): void {
    if (this.sortColumn() === columnKey) {
      const current = this.sortDirection();
      const next =
        current === 'none' ? 'asc' : current === 'asc' ? 'desc' : 'none';
      this.sortDirection.set(next);
      if (next === 'none') {
        this.sortColumn.set('');
      }
    } else {
      this.sortColumn.set(columnKey);
      this.sortDirection.set('asc');
    }

    this.sortChange.emit({
      column: this.sortColumn(),
      direction: this.sortDirection(),
    });
  }

  /** Toggle selection of a single row */
  toggleRow(index: number): void {
    this.selectedRows.update((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
    this.selectionChange.emit(this.selectedRows());
  }

  /** Toggle selection of all rows */
  toggleAll(): void {
    const rows = this.sortedData();
    if (this.allSelected()) {
      this.selectedRows.set(new Set());
    } else {
      const all = new Set<number>();
      for (let i = 0; i < rows.length; i++) {
        all.add(i);
      }
      this.selectedRows.set(all);
    }
    this.selectionChange.emit(this.selectedRows());
  }

  /** Get aria-sort value for a column */
  getAriaSort(columnKey: string): string | null {
    if (columnKey !== this.sortColumn()) {
      return null;
    }
    const dir = this.sortDirection();
    if (dir === 'asc') return 'ascending';
    if (dir === 'desc') return 'descending';
    return null;
  }
}
