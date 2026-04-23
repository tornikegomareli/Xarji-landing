import { en } from '../content/copy/en';
import { ka } from '../content/copy/ka';
import type { Copy } from '../content/copy/types';

export type { Copy, RichPart } from '../content/copy/types';

export const locales = ['en', 'ka'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

const dict: Record<Locale, Copy> = { en, ka };

export function getCopy(locale: string | undefined): Copy {
  return isLocale(locale) ? dict[locale] : dict[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'ka';
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ka: 'ქა',
};

export const localePaths: Record<Locale, string> = {
  en: '/',
  ka: '/ka/',
};

/**
 * Format an ISO date (`'2026-04-23'`) for display in the given locale.
 * `long` produces e.g. "April 23, 2026" in en-US and "2026 წლის 23 აპრილი"
 * in ka-GE via the ICU data bundled with V8.
 */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ka' ? 'ka-GE' : 'en-US', {
    dateStyle: 'long',
  }).format(new Date(iso));
}
