import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';

@Component({
  selector: 'dga-pagination',
  standalone: true,
  templateUrl: './dga-pagination.component.html',
  styleUrls: ['./dga-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaPaginationComponent {
  /** Total number of items */
  totalItems = input<number>(0);

  /** Items per page */
  pageSize = input<number>(10);

  /** Current page (1-based) */
  currentPage = input<number>(1);

  /** Maximum number of visible page buttons */
  maxVisiblePages = input<number>(5);

  /** Emits when the page changes */
  pageChange = output<number>();

  /** Total number of pages */
  totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return size > 0 ? Math.ceil(total / size) : 0;
  });

  /** Array of visible page numbers */
  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const max = this.maxVisiblePages();

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = max;
    }

    if (end > total) {
      end = total;
      start = total - max + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  /** Whether previous button is disabled */
  isPrevDisabled = computed(() => this.currentPage() <= 1);

  /** Whether next button is disabled */
  isNextDisabled = computed(() => this.currentPage() >= this.totalPages());

  /** Go to a specific page */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }
    this.pageChange.emit(page);
  }

  /** Go to previous page */
  goToPrevious(): void {
    this.goToPage(this.currentPage() - 1);
  }

  /** Go to next page */
  goToNext(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
