import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type DgaAvatarType = 'image' | 'initials' | 'icon';
export type DgaAvatarSize = 24 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 120;
export type DgaAvatarShape = 'circle' | 'square';

@Component({
  selector: 'dga-avatar',
  standalone: true,
  templateUrl: './dga-avatar.component.html',
  styleUrls: ['./dga-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaAvatarComponent {
  /** Avatar display type */
  type = input<DgaAvatarType>('initials');

  /** Size in pixels */
  size = input<DgaAvatarSize>(40);

  /** Shape */
  shape = input<DgaAvatarShape>('circle');

  /** Image URL (for type="image") */
  src = input<string>('');

  /** Alt text for image */
  alt = input<string>('');

  /** Initials text (for type="initials") */
  initials = input<string>('');

  /** Accessible label */
  ariaLabel = input<string>('');

  /** CSS classes */
  avatarClasses = computed(() => {
    return [
      'dga-avatar',
      `dga-avatar--${this.shape()}`,
      `dga-avatar--${this.size()}`,
    ].join(' ');
  });

  /** Inline size style */
  sizeStyle = computed(() => {
    const s = this.size();
    return `width: ${s}px; height: ${s}px;`;
  });

  /** Font size for initials scales with avatar size */
  initialsFontSize = computed(() => {
    return `${Math.round(this.size() * 0.4)}px`;
  });
}
