import { Injectable, signal, computed } from '@angular/core';
import { AR, EN } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly lang = signal<'ar' | 'en'>('ar');

  readonly isAr = computed(() => this.lang() === 'ar');

  private readonly translations = computed(() =>
    this.lang() === 'ar' ? AR : EN
  );

  t(key: string): string {
    return this.translations()[key] ?? key;
  }

  setLang(lang: string) {
    this.lang.set(lang as 'ar' | 'en');
  }
}
