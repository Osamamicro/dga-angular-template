import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaAvatarComponent } from './dga-avatar.component';

@Component({
  standalone: true,
  imports: [DgaAvatarComponent],
  template: `
    <dga-avatar
      [type]="type()"
      [size]="size()"
      [shape]="shape()"
      [src]="src()"
      [alt]="alt()"
      [initials]="initials()"
      [ariaLabel]="ariaLabel()"
    >
      <svg class="test-icon"></svg>
    </dga-avatar>
  `,
})
class TestHostComponent {
  type = signal<'image' | 'initials' | 'icon'>('initials');
  size = signal<24 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 120>(40);
  shape = signal<'circle' | 'square'>('circle');
  src = signal('https://example.com/photo.jpg');
  alt = signal('User photo');
  initials = signal('OA');
  ariaLabel = signal('');
}

describe('DgaAvatarComponent', () => {
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

  function getAvatar(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-avatar');
  }

  it('should create the avatar', () => {
    expect(getAvatar()).toBeTruthy();
  });

  it('should have role="img"', () => {
    expect(getAvatar().getAttribute('role')).toBe('img');
  });

  it('should show initials by default', () => {
    const initials = fixture.nativeElement.querySelector('.dga-avatar__initials');
    expect(initials).toBeTruthy();
    expect(initials.textContent.trim()).toBe('OA');
  });

  it('should show image when type is image', () => {
    host.type.set('image');
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('.dga-avatar__image');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('User photo');
  });

  it('should show icon content when type is icon', () => {
    host.type.set('icon');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.dga-avatar__icon');
    expect(icon).toBeTruthy();
    expect(icon.querySelector('.test-icon')).toBeTruthy();
  });

  it('should apply circle shape class', () => {
    expect(getAvatar().classList.contains('dga-avatar--circle')).toBe(true);
  });

  it('should apply square shape class', () => {
    host.shape.set('square');
    fixture.detectChanges();

    expect(getAvatar().classList.contains('dga-avatar--square')).toBe(true);
  });

  it('should apply size class and inline style', () => {
    host.size.set(64);
    fixture.detectChanges();

    const avatar = getAvatar();
    expect(avatar.classList.contains('dga-avatar--64')).toBe(true);
    expect(avatar.style.width).toBe('64px');
    expect(avatar.style.height).toBe('64px');
  });

  it('should use ariaLabel when provided', () => {
    host.ariaLabel.set('Custom label');
    fixture.detectChanges();

    expect(getAvatar().getAttribute('aria-label')).toBe('Custom label');
  });

  it('should fall back to alt for aria-label', () => {
    expect(getAvatar().getAttribute('aria-label')).toBe('User photo');
  });
});
