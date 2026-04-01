import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';

export type DgaCardVariant = 'flat' | 'shadow' | 'outlined';

@Component({
  selector: 'dga-card',
  standalone: true,
  templateUrl: './dga-card.component.html',
  styleUrls: ['./dga-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.tabindex]': 'interactive() ? 0 : null',
    '[attr.role]': 'interactive() ? "article" : null',
  },
})
export class DgaCardComponent {
  /** Visual variant of the card */
  variant = input<DgaCardVariant>('flat');

  /** Whether the card is interactive (clickable) */
  interactive = input<boolean>(false);

  /** Whether the card is in a selected state */
  selected = input<boolean>(false);

  /** Whether the card content is expandable */
  expandable = input<boolean>(false);

  /** Emitted when an interactive card is clicked */
  cardClick = output<void>();

  /** Computed CSS class string based on variant and state */
  cardClasses = computed(() => {
    const classes = ['dga-card', `dga-card--${this.variant()}`];

    if (this.interactive()) {
      classes.push('dga-card--interactive');
    }

    if (this.selected()) {
      classes.push('dga-card--selected');
    }

    if (this.expandable()) {
      classes.push('dga-card--expandable');
    }

    return classes.join(' ');
  });

  onCardClick(): void {
    if (this.interactive()) {
      this.cardClick.emit();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.interactive() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
