import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TranslationService } from './i18n/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private document = inject(DOCUMENT);
  readonly i18n = inject(TranslationService);

  currentTheme = signal<string>('light');

  constructor() {
    effect(() => {
      const lang = this.i18n.lang();
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });

    effect(() => {
      const theme = this.currentTheme();
      this.document.documentElement.setAttribute('data-theme', theme);
    });
  }
}
