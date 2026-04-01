import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaBreadcrumbComponent } from './dga-breadcrumb.component';
import { DgaBreadcrumbItemComponent } from './dga-breadcrumb-item.component';

@Component({
  standalone: true,
  imports: [DgaBreadcrumbComponent, DgaBreadcrumbItemComponent],
  template: `
    <dga-breadcrumb [ariaLabel]="ariaLabel()">
      <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
      <dga-breadcrumb-item href="/section">Section</dga-breadcrumb-item>
      <dga-breadcrumb-item [active]="true">Current Page</dga-breadcrumb-item>
    </dga-breadcrumb>
  `,
})
class TestHostComponent {
  ariaLabel = signal('Breadcrumb');
}

describe('DgaBreadcrumbComponent', () => {
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

  it('should create the breadcrumb component', () => {
    const nav = fixture.nativeElement.querySelector('nav.dga-breadcrumb');
    expect(nav).toBeTruthy();
  });

  it('should have aria-label on nav element', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should render an ordered list', () => {
    const ol = fixture.nativeElement.querySelector('ol.dga-breadcrumb__list');
    expect(ol).toBeTruthy();
  });

  it('should render all breadcrumb items', () => {
    const items = fixture.nativeElement.querySelectorAll('.dga-breadcrumb__item');
    expect(items.length).toBe(3);
  });

  it('should render links for non-active items with href', () => {
    const links = fixture.nativeElement.querySelectorAll('.dga-breadcrumb__link');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/section');
  });

  it('should render text with aria-current for active item', () => {
    const activeItem = fixture.nativeElement.querySelector(
      '.dga-breadcrumb__item--active'
    );
    expect(activeItem).toBeTruthy();

    const span = activeItem.querySelector('[aria-current="page"]');
    expect(span).toBeTruthy();
    expect(span.textContent).toContain('Current Page');
  });

  it('should show separator for non-active items', () => {
    const separators = fixture.nativeElement.querySelectorAll(
      '.dga-breadcrumb__separator'
    );
    expect(separators.length).toBe(2);
  });

  it('should not show separator for the active item', () => {
    const activeItem = fixture.nativeElement.querySelector(
      '.dga-breadcrumb__item--active'
    );
    const separator = activeItem.querySelector('.dga-breadcrumb__separator');
    expect(separator).toBeNull();
  });

  it('should update aria-label dynamically', () => {
    host.ariaLabel.set('Navigation path');
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Navigation path');
  });
});
