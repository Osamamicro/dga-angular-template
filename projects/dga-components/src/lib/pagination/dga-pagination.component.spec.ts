import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaPaginationComponent } from './dga-pagination.component';

@Component({
  standalone: true,
  imports: [DgaPaginationComponent],
  template: `
    <dga-pagination
      [totalItems]="totalItems()"
      [pageSize]="pageSize()"
      [currentPage]="currentPage()"
      [maxVisiblePages]="maxVisiblePages()"
      (pageChange)="onPageChange($event)"
    ></dga-pagination>
  `,
})
class TestHostComponent {
  totalItems = signal(100);
  pageSize = signal(10);
  currentPage = signal(1);
  maxVisiblePages = signal(5);
  lastPage = 0;

  onPageChange(page: number): void {
    this.lastPage = page;
    this.currentPage.set(page);
  }
}

describe('DgaPaginationComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getPageButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-pagination__page')
    );
  }

  function getPrevButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.dga-pagination__btn--prev');
  }

  function getNextButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.dga-pagination__btn--next');
  }

  it('should create the pagination component', () => {
    const nav = fixture.nativeElement.querySelector('nav.dga-pagination');
    expect(nav).toBeTruthy();
  });

  it('should have aria-label on nav', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Pagination');
  });

  it('should render correct number of page buttons', () => {
    const pages = getPageButtons();
    expect(pages.length).toBe(5);
  });

  it('should highlight current page with aria-current', () => {
    const pages = getPageButtons();
    expect(pages[0].getAttribute('aria-current')).toBe('page');
    expect(pages[0].classList.contains('dga-pagination__page--active')).toBe(true);
  });

  it('should disable previous button on first page', () => {
    expect(getPrevButton().disabled).toBe(true);
  });

  it('should enable next button when not on last page', () => {
    expect(getNextButton().disabled).toBe(false);
  });

  it('should navigate to next page', () => {
    getNextButton().click();
    fixture.detectChanges();

    expect(host.lastPage).toBe(2);
  });

  it('should navigate to previous page', () => {
    host.currentPage.set(5);
    fixture.detectChanges();

    getPrevButton().click();
    fixture.detectChanges();

    expect(host.lastPage).toBe(4);
  });

  it('should navigate to a specific page when clicked', () => {
    const pages = getPageButtons();
    pages[2].click();
    fixture.detectChanges();

    expect(host.lastPage).toBe(3);
  });

  it('should disable next button on last page', () => {
    host.currentPage.set(10);
    fixture.detectChanges();

    expect(getNextButton().disabled).toBe(true);
  });

  it('should show all pages when total pages <= maxVisiblePages', () => {
    host.totalItems.set(30);
    fixture.detectChanges();

    expect(getPageButtons().length).toBe(3);
  });

  it('should have aria-label on page buttons', () => {
    const pages = getPageButtons();
    expect(pages[0].getAttribute('aria-label')).toBe('Page 1');
    expect(pages[1].getAttribute('aria-label')).toBe('Page 2');
  });

  it('should have aria-label on prev/next buttons', () => {
    expect(getPrevButton().getAttribute('aria-label')).toBe('Previous page');
    expect(getNextButton().getAttribute('aria-label')).toBe('Next page');
  });
});
