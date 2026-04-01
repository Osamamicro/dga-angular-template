import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaFooterComponent, DgaFooterColumn } from './dga-footer.component';

@Component({
  standalone: true,
  imports: [DgaFooterComponent],
  template: `
    <dga-footer [columns]="columns()" [copyright]="copyright()">
      <div class="custom-content">Social links</div>
    </dga-footer>
  `,
})
class TestHostComponent {
  columns = signal<DgaFooterColumn[]>([
    { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }] },
    { title: 'Resources', links: [{ label: 'Docs', href: '/docs' }] },
  ]);
  copyright = signal('2026 GACA');
}

describe('DgaFooterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the footer', () => {
    expect(fixture.nativeElement.querySelector('.dga-footer')).toBeTruthy();
  });

  it('should have role="contentinfo"', () => {
    expect(fixture.nativeElement.querySelector('footer').getAttribute('role')).toBe('contentinfo');
  });

  it('should render column titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.dga-footer__column-title');
    expect(titles.length).toBe(2);
    expect(titles[0].textContent).toContain('Company');
  });

  it('should render column links', () => {
    const links = fixture.nativeElement.querySelectorAll('.dga-footer__link');
    expect(links.length).toBe(3);
  });

  it('should have nav with aria-label per column', () => {
    const navs = fixture.nativeElement.querySelectorAll('.dga-footer__column');
    expect(navs[0].getAttribute('aria-label')).toBe('Company');
  });

  it('should render copyright', () => {
    expect(fixture.nativeElement.querySelector('.dga-footer__copyright').textContent).toContain('2026 GACA');
  });

  it('should render projected content', () => {
    expect(fixture.nativeElement.querySelector('.custom-content')).toBeTruthy();
  });
});
