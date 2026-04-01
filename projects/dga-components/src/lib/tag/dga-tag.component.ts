import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';

export type DgaTagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type DgaTagStyle = 'subtle' | 'outline' | 'filled';
export type DgaTagSize = 'sm' | 'md';

@Component({
  selector: 'dga-tag',
  standalone: true,
  templateUrl: './dga-tag.component.html',
  styleUrls: ['./dga-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaTagComponent {
  /** Color palette of the tag */
  color = input<DgaTagColor>('primary');

  /** Visual style of the tag */
  style = input<DgaTagStyle>('subtle');

  /** Size of the tag */
  size = input<DgaTagSize>('md');

  /** Whether the tag shows a dismiss button */
  removable = input<boolean>(false);

  /** Emitted when the dismiss button is clicked */
  removed = output<void>();

  /** Computed CSS class string based on color, style, and size */
  tagClasses = computed(() => {
    const classes = [
      'dga-tag',
      `dga-tag-${this.color()}`,
      `dga-tag--${this.style()}`,
      `dga-tag--${this.size()}`,
    ];

    return classes.join(' ');
  });

  onRemove(event: Event): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
