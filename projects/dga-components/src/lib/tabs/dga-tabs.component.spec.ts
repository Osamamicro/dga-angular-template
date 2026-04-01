import { vi } from 'vitest';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaTabsComponent } from './dga-tabs.component';
import { DgaTabComponent } from './dga-tab.component';

@Component({
  standalone: true,
  imports: [DgaTabsComponent, DgaTabComponent],
  template: `
    <dga-tabs [orientation]="orientation()">
      <dga-tab label="Tab 1">Content 1</dga-tab>
      <dga-tab label="Tab 2" [disabled]="secondDisabled()">Content 2</dga-tab>
      <dga-tab label="Tab 3">Content 3</dga-tab>
    </dga-tabs>
  `,
})
class TestHostComponent {
  orientation = signal<'horizontal' | 'vertical'>('horizontal');
  secondDisabled = signal(false);
}

describe('DgaTabsComponent', () => {
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

  function getTabButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-tabs__tab')
    );
  }

  function getPanels(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-tabs__panel')
    );
  }

  function getTabList(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-tabs__list');
  }

  it('should create the tabs component', () => {
    const container = fixture.nativeElement.querySelector('.dga-tabs');
    expect(container).toBeTruthy();
    expect(getTabButtons().length).toBe(3);
  });

  it('should select a tab when clicked', () => {
    const tabs = getTabButtons();

    // First tab is active by default
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');

    // Click second tab
    tabs[2].click();
    fixture.detectChanges();

    const updatedTabs = getTabButtons();
    expect(updatedTabs[2].getAttribute('aria-selected')).toBe('true');
    expect(updatedTabs[0].getAttribute('aria-selected')).toBe('false');
  });

  it('should apply active class to selected tab', () => {
    const tabs = getTabButtons();
    expect(tabs[0].classList.contains('dga-tabs__tab--active')).toBe(true);
    expect(tabs[1].classList.contains('dga-tabs__tab--active')).toBe(false);

    tabs[2].click();
    fixture.detectChanges();

    const updatedTabs = getTabButtons();
    expect(updatedTabs[2].classList.contains('dga-tabs__tab--active')).toBe(true);
    expect(updatedTabs[0].classList.contains('dga-tabs__tab--active')).toBe(false);
  });

  it('should navigate tabs with arrow keys', () => {
    const tabList = getTabList();

    // Focus first tab, press ArrowRight
    tabList.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );
    fixture.detectChanges();

    const tabs = getTabButtons();
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  it('should skip disabled tabs during keyboard navigation', () => {
    host.secondDisabled.set(true);
    fixture.detectChanges();

    const tabList = getTabList();

    // Press ArrowRight from tab 0 — should skip disabled tab 1, go to tab 2
    tabList.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );
    fixture.detectChanges();

    const tabs = getTabButtons();
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
  });

  it('should set aria-selected correctly', () => {
    const tabs = getTabButtons();

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
    expect(tabs[2].getAttribute('aria-selected')).toBe('false');

    // Check tabindex
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('tabindex')).toBe('-1');
  });

  it('should apply vertical orientation class', () => {
    host.orientation.set('vertical');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.dga-tabs');
    expect(container.classList.contains('dga-tabs--vertical')).toBe(true);
  });
});
