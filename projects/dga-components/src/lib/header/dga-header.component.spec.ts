import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaHeaderComponent, DgaNavItem } from './dga-header.component';

@Component({
  standalone: true,
  imports: [DgaHeaderComponent],
  template: `
    <dga-header
      [logoSrc]="logoSrc()"
      [logoAlt]="logoAlt()"
      [siteTitle]="siteTitle()"
      [navItems]="navItems()"
    >
      <button class="custom-action">Action</button>
    </dga-header>
  `,
})
class TestHostComponent {
  logoSrc = signal('/logo.png');
  logoAlt = signal('Site Logo');
  siteTitle = signal('My Site');
  navItems = signal<DgaNavItem[]>([
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]);
}

describe('DgaHeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the header', () => {
    const header = fixture.nativeElement.querySelector('.dga-header');
    expect(header).toBeTruthy();
  });

  it('should have a skip-to-content link', () => {
    const skip = fixture.nativeElement.querySelector('.dga-header__skip-nav');
    expect(skip).toBeTruthy();
    expect(skip.getAttribute('href')).toBe('#main-content');
  });

  it('should render the logo', () => {
    const logo = fixture.nativeElement.querySelector('.dga-header__logo');
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('alt')).toBe('Site Logo');
  });

  it('should render the site title', () => {
    const title = fixture.nativeElement.querySelector('.dga-header__title');
    expect(title.textContent).toContain('My Site');
  });

  it('should render nav items', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('.dga-header__nav-link');
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].textContent).toContain('Home');
  });

  it('should mark active nav item with aria-current', () => {
    const activeLink = fixture.nativeElement.querySelector('.dga-header__nav-link--active');
    expect(activeLink).toBeTruthy();
    expect(activeLink.getAttribute('aria-current')).toBe('page');
  });

  it('should have nav with aria-label', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('should have hamburger button with aria-expanded', () => {
    const hamburger = fixture.nativeElement.querySelector('.dga-header__hamburger');
    expect(hamburger).toBeTruthy();
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle mobile menu on hamburger click', () => {
    const hamburger = fixture.nativeElement.querySelector('.dga-header__hamburger');
    hamburger.click();
    fixture.detectChanges();

    expect(hamburger.getAttribute('aria-expanded')).toBe('true');
    const nav = fixture.nativeElement.querySelector('.dga-header__nav');
    expect(nav.classList.contains('dga-header__nav--open')).toBe(true);
  });

  it('should render projected content in actions', () => {
    const action = fixture.nativeElement.querySelector('.custom-action');
    expect(action).toBeTruthy();
  });
});
