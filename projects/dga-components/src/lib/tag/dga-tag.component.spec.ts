import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaTagComponent } from './dga-tag.component';

describe('DgaTagComponent', () => {
  let component: DgaTagComponent;
  let fixture: ComponentFixture<DgaTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct color and style classes', () => {
    const tagEl = fixture.nativeElement.querySelector('.dga-tag');
    expect(tagEl.classList.contains('dga-tag-primary')).toBe(true);
    expect(tagEl.classList.contains('dga-tag--subtle')).toBe(true);

    fixture.componentRef.setInput('color', 'danger');
    fixture.componentRef.setInput('style', 'filled');
    fixture.detectChanges();

    const updatedTagEl = fixture.nativeElement.querySelector('.dga-tag');
    expect(updatedTagEl.classList.contains('dga-tag-danger')).toBe(true);
    expect(updatedTagEl.classList.contains('dga-tag--filled')).toBe(true);
    expect(updatedTagEl.classList.contains('dga-tag-primary')).toBe(false);
  });

  it('should show dismiss button when removable', () => {
    let dismissBtn = fixture.nativeElement.querySelector('.dga-tag__dismiss');
    expect(dismissBtn).toBeFalsy();

    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    dismissBtn = fixture.nativeElement.querySelector('.dga-tag__dismiss');
    expect(dismissBtn).toBeTruthy();
  });

  it('should emit removed event when dismiss button is clicked', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.removed, 'emit');
    const dismissBtn = fixture.nativeElement.querySelector('.dga-tag__dismiss');
    dismissBtn.click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should apply correct size class', () => {
    const tagEl = fixture.nativeElement.querySelector('.dga-tag');
    expect(tagEl.classList.contains('dga-tag--md')).toBe(true);

    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const updatedTagEl = fixture.nativeElement.querySelector('.dga-tag');
    expect(updatedTagEl.classList.contains('dga-tag--sm')).toBe(true);
    expect(updatedTagEl.classList.contains('dga-tag--md')).toBe(false);
  });

  it('should have correct aria-label on dismiss button', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const dismissBtn = fixture.nativeElement.querySelector('.dga-tag__dismiss');
    expect(dismissBtn.getAttribute('aria-label')).toBe('إزالة');
  });
});
