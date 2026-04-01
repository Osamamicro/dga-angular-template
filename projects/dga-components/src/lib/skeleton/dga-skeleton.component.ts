import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type DgaSkeletonType = 'line' | 'circle' | 'rectangle' | 'square';

@Component({
  selector: 'dga-skeleton',
  standalone: true,
  templateUrl: './dga-skeleton.component.html',
  styleUrls: ['./dga-skeleton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaSkeletonComponent {
  /** Shape type */
  type = input<DgaSkeletonType>('line');

  /** Width (CSS value, e.g. "100%", "200px") */
  width = input<string>('100%');

  /** Height (CSS value, e.g. "16px") */
  height = input<string>('');

  /** CSS classes */
  skeletonClasses = computed(() => {
    return `dga-skeleton dga-skeleton--${this.type()}`;
  });

  /** Computed inline styles */
  skeletonStyle = computed(() => {
    const w = this.width();
    const h = this.height();
    const t = this.type();

    const style: Record<string, string> = { width: w };

    if (h) {
      style['height'] = h;
    } else {
      switch (t) {
        case 'line':
          style['height'] = '16px';
          break;
        case 'circle':
          style['height'] = w;
          break;
        case 'square':
          style['height'] = w;
          break;
        case 'rectangle':
          style['height'] = '120px';
          break;
      }
    }

    return Object.entries(style)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');
  });
}
