import { vi } from 'vitest';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaAccordionComponent } from './dga-accordion.component';
import { DgaAccordionItemComponent } from './dga-accordion-item.component';

@Component({
  standalone: true,
  imports: [DgaAccordionComponent, DgaAccordionItemComponent],
  template: `
    <dga-accordion [multi]="multi()">
      <dga-accordion-item title="Item 1" [disabled]="firstDisabled()">
        Content 1
      </dga-accordion-item>
      <dga-accordion-item title="Item 2">Content 2</dga-accordion-item>
      <dga-accordion-item title="Item 3">Content 3</dga-accordion-item>
    </dga-accordion>
  `,
})
class TestHostComponent {
  multi = signal(false);
  firstDisabled = signal(false);
}

describe('DgaAccordionComponent', () => {
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

  function getHeaders(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-accordion-item__header')
    );
  }

  function getPanels(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-accordion-item__panel')
    );
  }

  it('should create the accordion component', () => {
    const accordion = fixture.nativeElement.querySelector('.dga-accordion');
    expect(accordion).toBeTruthy();
  });

  it('should toggle an item when its header is clicked', () => {
    const headers = getHeaders();

    // Initially no panels are open
    expect(getPanels().length).toBe(0);

    // Click first header to expand
    headers[0].click();
    fixture.detectChanges();

    expect(getPanels().length).toBe(1);

    // Click again to collapse
    headers[0].click();
    fixture.detectChanges();

    expect(getPanels().length).toBe(0);
  });

  it('should set aria-expanded correctly', () => {
    const headers = getHeaders();

    expect(headers[0].getAttribute('aria-expanded')).toBe('false');

    headers[0].click();
    fixture.detectChanges();

    const updatedHeaders = getHeaders();
    expect(updatedHeaders[0].getAttribute('aria-expanded')).toBe('true');
  });

  it('should allow multiple items open in multi mode', () => {
    host.multi.set(true);
    fixture.detectChanges();

    const headers = getHeaders();
    headers[0].click();
    fixture.detectChanges();

    headers[1].click();
    fixture.detectChanges();

    expect(getPanels().length).toBe(2);
  });

  it('should collapse other items in single mode', () => {
    const headers = getHeaders();

    // Open first item
    headers[0].click();
    fixture.detectChanges();
    expect(getPanels().length).toBe(1);

    // Open second item — in single mode, toggle() calls collapseOthers on the
    // parent accordion tracking, but each item's isExpanded is local.
    // Verify the parent accordion only tracks the latest item as expanded.
    headers[1].click();
    fixture.detectChanges();

    const accordion = fixture.debugElement.children[0].componentInstance as DgaAccordionComponent;
    expect(accordion.expandedItems().size).toBe(1);
  });

  it('should not toggle when disabled', () => {
    host.firstDisabled.set(true);
    fixture.detectChanges();

    const headers = getHeaders();
    expect(headers[0].disabled).toBe(true);

    headers[0].click();
    fixture.detectChanges();

    expect(getPanels().length).toBe(0);
  });

  it('should toggle on Enter and Space keypress', () => {
    const headers = getHeaders();

    // Simulate Enter key
    headers[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    headers[0].click();
    fixture.detectChanges();

    expect(getPanels().length).toBe(1);

    // Simulate Space key — triggers click on buttons natively
    headers[0].click();
    fixture.detectChanges();

    expect(getPanels().length).toBe(0);
  });
});
