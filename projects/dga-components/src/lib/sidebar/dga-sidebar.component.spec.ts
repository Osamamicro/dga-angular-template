import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaSidebarComponent, DgaSidebarItem } from './dga-sidebar.component';

@Component({
  standalone: true,
  imports: [DgaSidebarComponent],
  template: `<dga-sidebar [items]="items()" [collapsed]="collapsed()"></dga-sidebar>`,
})
class TestHostComponent {
  collapsed = signal(false);
  items = signal<DgaSidebarItem[]>([
    { label: 'Dashboard', href: '/', active: true },
    { label: 'Settings', children: [
      { label: 'Profile', href: '/profile' },
      { label: 'Security', href: '/security', active: true },
    ]},
    { label: 'Help', href: '/help' },
  ]);
}

describe('DgaSidebarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('.dga-sidebar')).toBeTruthy();
  });

  it('should have aria-label on nav', () => {
    expect(fixture.nativeElement.querySelector('nav').getAttribute('aria-label')).toBe('Sidebar navigation');
  });

  it('should render top-level items', () => {
    const links = fixture.nativeElement.querySelectorAll('.dga-sidebar__link');
    expect(links.length).toBe(3); // Dashboard, Settings (parent button), Help
  });

  it('should mark active item with aria-current', () => {
    const active = fixture.nativeElement.querySelector('[aria-current="page"]');
    expect(active).toBeTruthy();
    expect(active.textContent).toContain('Dashboard');
  });

  it('should have aria-expanded on parent items', () => {
    const parent = fixture.nativeElement.querySelector('.dga-sidebar__link--parent');
    expect(parent.getAttribute('aria-expanded')).toBe('false');
  });

  it('should expand sub-menu on click', () => {
    const parent = fixture.nativeElement.querySelector('.dga-sidebar__link--parent');
    parent.click();
    fixture.detectChanges();

    expect(parent.getAttribute('aria-expanded')).toBe('true');
    const subItems = fixture.nativeElement.querySelectorAll('.dga-sidebar__link--child');
    expect(subItems.length).toBe(2);
  });

  it('should collapse sub-menu on second click', () => {
    const parent = fixture.nativeElement.querySelector('.dga-sidebar__link--parent');
    parent.click();
    fixture.detectChanges();
    parent.click();
    fixture.detectChanges();

    expect(parent.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelectorAll('.dga-sidebar__link--child').length).toBe(0);
  });

  it('should apply collapsed class', () => {
    host.collapsed.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dga-sidebar--collapsed')).toBeTruthy();
  });
});
