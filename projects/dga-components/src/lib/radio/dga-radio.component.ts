import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
  inject,
} from '@angular/core';
import { DgaRadioGroupComponent } from './dga-radio-group.component';

@Component({
  selector: 'dga-radio',
  standalone: true,
  templateUrl: './dga-radio.component.html',
  styleUrls: ['./dga-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaRadioComponent {
  private radioGroup = inject(DgaRadioGroupComponent);

  /** Value for this radio option */
  value = input<any>(null);

  /** Label text */
  label = input<string>('');

  /** Whether this individual radio is disabled */
  disabled = input<boolean>(false);

  /** Whether this radio is selected (derived from parent group) */
  isSelected = computed(() => this.radioGroup.value() === this.value());

  /** Whether this radio is effectively disabled */
  isDisabled = computed(() => this.disabled() || this.radioGroup.disabled());

  /** Computed CSS classes */
  radioClasses = computed(() => {
    const classes = ['dga-radio'];
    if (this.isSelected()) classes.push('dga-radio--selected');
    if (this.isDisabled()) classes.push('dga-radio--disabled');
    return classes.join(' ');
  });

  /** Get the group name */
  get groupName(): string {
    return this.radioGroup.name();
  }

  onSelect(): void {
    if (this.isDisabled()) return;
    this.radioGroup.select(this.value());
  }
}
