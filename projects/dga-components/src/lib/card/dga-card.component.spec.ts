import { vi } from 'vitest';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaCardComponent } from './dga-card.component';

@Component({
  standalone: true,
  imports: [DgaCardComponent],
  template: `
    <dga-card [interactive]="true">
      <div card-header>Header</div>
      <div card-media>Media</div>
      <p>Body content</p>
      <div card-actions>Actions</div>
      <div card-footer>Footer</div>
    </dga-card>
  `,
})
class CardProjectionHostComponent {}

describe('DgaCardComponent', () => {
  let component: DgaCardComponent;
  let fixture: ComponentFixture<DgaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaCardComponent, CardProjectionHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct variant classes', () => {
    const cardEl = fixture.nativeElement.querySelector('.dga-card');
    expect(cardEl.classList.contains('dga-card--flat')).toBe(true);

    fixture.componentRef.setInput('variant', 'shadow');
    fixture.detectChanges();
    const updatedCardEl = fixture.nativeElement.querySelector('.dga-card');

    expect(updatedCardEl.classList.contains('dga-card--shadow')).toBe(true);
    expect(updatedCardEl.classList.contains('dga-card--flat')).toBe(false);
  });

  it('should render as interactive with tabindex and role', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();

    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.getAttribute('tabindex')).toBe('0');
    expect(hostEl.getAttribute('role')).toBe('article');

    const cardEl = fixture.nativeElement.querySelector('.dga-card');
    expect(cardEl.classList.contains('dga-card--interactive')).toBe(true);
  });

  it('should project content into named slots', () => {
    const projFixture = TestBed.createComponent(CardProjectionHostComponent);
    projFixture.detectChanges();

    const cardEl = projFixture.nativeElement.querySelector('.dga-card') as HTMLElement;
    expect(cardEl).toBeTruthy();

    // Verify named slot projections render inside the card
    expect(cardEl.querySelector('[card-header]')!.textContent).toContain('Header');
    expect(cardEl.querySelector('[card-media]')!.textContent).toContain('Media');
    expect(cardEl.querySelector('[card-actions]')!.textContent).toContain('Actions');
    expect(cardEl.querySelector('[card-footer]')!.textContent).toContain('Footer');

    // Verify the body wrapper exists
    const body = cardEl.querySelector('.dga-card__body');
    expect(body).toBeTruthy();
  });

  it('should apply selected state class', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const cardEl = fixture.nativeElement.querySelector('.dga-card');
    expect(cardEl.classList.contains('dga-card--selected')).toBe(true);
  });

  it('should emit cardClick when interactive card is clicked', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.cardClick, 'emit');
    const cardEl = fixture.nativeElement.querySelector('.dga-card');
    cardEl.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
