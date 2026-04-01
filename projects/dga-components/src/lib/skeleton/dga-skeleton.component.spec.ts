import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaSkeletonComponent } from './dga-skeleton.component';

@Component({
  standalone: true,
  imports: [DgaSkeletonComponent],
  template: `
    <div aria-busy="true">
      <dga-skeleton
        [type]="type()"
        [width]="width()"
        [height]="height()"
      ></dga-skeleton>
    </div>
  `,
})
class TestHostComponent {
  type = signal<'line' | 'circle' | 'rectangle' | 'square'>('line');
  width = signal('100%');
  height = signal('');
}

describe('DgaSkeletonComponent', () => {
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

  function getSkeleton(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-skeleton');
  }

  it('should create the skeleton', () => {
    expect(getSkeleton()).toBeTruthy();
  });

  it('should have aria-hidden="true"', () => {
    expect(getSkeleton().getAttribute('aria-hidden')).toBe('true');
  });

  it('should apply line type class by default', () => {
    expect(getSkeleton().classList.contains('dga-skeleton--line')).toBe(true);
  });

  it('should apply circle type class', () => {
    host.type.set('circle');
    fixture.detectChanges();
    expect(getSkeleton().classList.contains('dga-skeleton--circle')).toBe(true);
  });

  it('should apply rectangle type class', () => {
    host.type.set('rectangle');
    fixture.detectChanges();
    expect(getSkeleton().classList.contains('dga-skeleton--rectangle')).toBe(true);
  });

  it('should apply default width', () => {
    expect(getSkeleton().style.width).toBe('100%');
  });

  it('should apply custom width', () => {
    host.width.set('200px');
    fixture.detectChanges();
    expect(getSkeleton().style.width).toBe('200px');
  });

  it('should apply custom height when provided', () => {
    host.height.set('32px');
    fixture.detectChanges();
    expect(getSkeleton().style.height).toBe('32px');
  });

  it('should default to 16px height for line type', () => {
    expect(getSkeleton().style.height).toBe('16px');
  });

  it('should default to width value for circle type', () => {
    host.type.set('circle');
    host.width.set('48px');
    fixture.detectChanges();
    expect(getSkeleton().style.height).toBe('48px');
  });

  it('should have aria-busy on parent container', () => {
    const container = fixture.nativeElement.querySelector('[aria-busy]');
    expect(container.getAttribute('aria-busy')).toBe('true');
  });
});
