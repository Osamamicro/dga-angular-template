import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';

export interface DgaFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

@Component({
  selector: 'dga-footer',
  standalone: true,
  templateUrl: './dga-footer.component.html',
  styleUrls: ['./dga-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaFooterComponent {
  columns = input<DgaFooterColumn[]>([]);
  copyright = input<string>('');
}
