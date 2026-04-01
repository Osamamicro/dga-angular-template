import {
  Directive,
  input,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type DgaTooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end';

let nextId = 0;

@Directive({
  selector: '[dgaTooltip]',
  standalone: true,
})
export class DgaTooltipDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  /** Tooltip text */
  dgaTooltip = input.required<string>();

  /** Position of the tooltip */
  dgaTooltipPosition = input<DgaTooltipPosition>('top');

  private tooltipElement: HTMLElement | null = null;
  private readonly tooltipId = `dga-tooltip-${nextId++}`;

  private showHandler = () => this.show();
  private hideHandler = () => this.hide();
  private keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.hide();
  };

  constructor() {
    const el = this.elementRef.nativeElement as HTMLElement;

    el.addEventListener('mouseenter', this.showHandler);
    el.addEventListener('mouseleave', this.hideHandler);
    el.addEventListener('focus', this.showHandler);
    el.addEventListener('blur', this.hideHandler);
    el.addEventListener('keydown', this.keydownHandler);

    // Set aria-describedby
    el.setAttribute('aria-describedby', this.tooltipId);
  }

  ngOnDestroy(): void {
    this.hide();
    const el = this.elementRef.nativeElement as HTMLElement;
    el.removeEventListener('mouseenter', this.showHandler);
    el.removeEventListener('mouseleave', this.hideHandler);
    el.removeEventListener('focus', this.showHandler);
    el.removeEventListener('blur', this.hideHandler);
    el.removeEventListener('keydown', this.keydownHandler);
  }

  private show(): void {
    if (this.tooltipElement) return;

    const text = this.dgaTooltip();
    if (!text) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.setAttribute(this.tooltipElement, 'id', this.tooltipId);
    this.renderer.setAttribute(this.tooltipElement, 'role', 'tooltip');
    this.renderer.addClass(this.tooltipElement, 'dga-tooltip');
    this.renderer.addClass(
      this.tooltipElement,
      `dga-tooltip--${this.dgaTooltipPosition()}`
    );

    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(this.tooltipElement, textNode);
    this.renderer.appendChild(this.document.body, this.tooltipElement);

    this.positionTooltip();
  }

  private hide(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const hostRect = (
      this.elementRef.nativeElement as HTMLElement
    ).getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const position = this.dgaTooltipPosition();

    let top = 0;
    let left = 0;
    const gap = 8;

    switch (position) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
      case 'top-start':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left;
        break;
      case 'top-end':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.right - tooltipRect.width;
        break;
    }

    this.renderer.setStyle(
      this.tooltipElement,
      'top',
      `${top + window.scrollY}px`
    );
    this.renderer.setStyle(
      this.tooltipElement,
      'left',
      `${left + window.scrollX}px`
    );
  }
}
