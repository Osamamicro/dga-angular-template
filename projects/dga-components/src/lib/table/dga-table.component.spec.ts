import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaTableComponent, DgaTableColumn } from './dga-table.component';

describe('DgaTableComponent', () => {
  let component: DgaTableComponent;
  let fixture: ComponentFixture<DgaTableComponent>;

  const testColumns: DgaTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'city', label: 'City' },
  ];

  const testData = [
    { name: 'Charlie', age: 30, city: 'Riyadh' },
    { name: 'Alice', age: 25, city: 'Jeddah' },
    { name: 'Bob', age: 35, city: 'Dammam' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', testColumns);
    fixture.componentRef.setInput('data', testData);
    fixture.detectChanges();
  });

  function getHeaderCells(): HTMLTableCellElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('thead th'));
  }

  function getBodyRows(): HTMLTableRowElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('tbody tr'));
  }

  function getBodyCells(): HTMLTableCellElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('tbody td'));
  }

  it('should create the table component', () => {
    expect(component).toBeTruthy();
    const table = fixture.nativeElement.querySelector('.dga-table');
    expect(table).toBeTruthy();
  });

  it('should render columns and rows', () => {
    const headers = getHeaderCells();
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Age');
    expect(headers[2].textContent).toContain('City');

    const rows = getBodyRows();
    expect(rows.length).toBe(3);
  });

  it('should toggle sort direction when clicking a sortable column', () => {
    const sortBtn = fixture.nativeElement.querySelector('.dga-table__sort-btn');
    expect(sortBtn).toBeTruthy();

    // First click: ascending
    sortBtn.click();
    fixture.detectChanges();
    expect(component.sortColumn()).toBe('name');
    expect(component.sortDirection()).toBe('asc');

    // Second click: descending
    sortBtn.click();
    fixture.detectChanges();
    expect(component.sortDirection()).toBe('desc');

    // Third click: none
    sortBtn.click();
    fixture.detectChanges();
    expect(component.sortDirection()).toBe('none');
  });

  it('should sort data ascending by name', () => {
    component.toggleSort('name');
    fixture.detectChanges();

    const rows = getBodyRows();
    const firstCell = rows[0].querySelectorAll('td')[0];
    expect(firstCell.textContent?.trim()).toBe('Alice');
  });

  it('should sort data descending by name', () => {
    component.toggleSort('name'); // asc
    component.toggleSort('name'); // desc
    fixture.detectChanges();

    const rows = getBodyRows();
    const firstCell = rows[0].querySelectorAll('td')[0];
    expect(firstCell.textContent?.trim()).toBe('Charlie');
  });

  it('should toggle row selection when selectable', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    const checkboxes = fixture.nativeElement.querySelectorAll(
      'tbody input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;
    expect(checkboxes.length).toBe(3);

    // Select first row
    checkboxes[0].click();
    fixture.detectChanges();

    expect(component.selectedRows().has(0)).toBe(true);
    expect(component.selectedRows().size).toBe(1);

    // Deselect first row
    checkboxes[0].click();
    fixture.detectChanges();

    expect(component.selectedRows().has(0)).toBe(false);
  });

  it('should select and deselect all rows', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    const selectAllCheckbox = fixture.nativeElement.querySelector(
      'thead input[type="checkbox"]'
    ) as HTMLInputElement;

    // Select all
    selectAllCheckbox.click();
    fixture.detectChanges();

    expect(component.selectedRows().size).toBe(3);
    expect(component.allSelected()).toBe(true);

    // Deselect all
    selectAllCheckbox.click();
    fixture.detectChanges();

    expect(component.selectedRows().size).toBe(0);
  });

  it('should apply variant classes', () => {
    fixture.componentRef.setInput('variant', 'striped');
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('.dga-table');
    expect(table.classList.contains('dga-table--striped')).toBe(true);

    fixture.componentRef.setInput('variant', 'compact');
    fixture.detectChanges();

    const updatedTable = fixture.nativeElement.querySelector('.dga-table');
    expect(updatedTable.classList.contains('dga-table--compact')).toBe(true);
  });

  it('should set aria-sort attribute on sorted columns', () => {
    component.toggleSort('name');
    fixture.detectChanges();

    const headers = getHeaderCells();
    expect(headers[0].getAttribute('aria-sort')).toBe('ascending');
    expect(headers[1].getAttribute('aria-sort')).toBeNull();

    component.toggleSort('name'); // desc
    fixture.detectChanges();

    const updatedHeaders = getHeaderCells();
    expect(updatedHeaders[0].getAttribute('aria-sort')).toBe('descending');
  });
});
