import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'terminal';

const THEME_STORAGE_KEY = 'utils-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
    this.watchSystemTheme();
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.applyTheme(theme);

    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in private or restricted browser contexts.
    }
  }

  private getInitialTheme(): Theme {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) return storedTheme;

    return this.getSystemTheme();
  }

  private getStoredTheme(): Theme | null {
    try {
      const storedTheme = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'terminal'
        ? storedTheme
        : null;
    } catch {
      return null;
    }
  }

  private getSystemTheme(): Theme {
    return this.getSystemMediaQuery()?.matches ? 'dark' : 'light';
  }

  private watchSystemTheme(): void {
    const mediaQuery = this.getSystemMediaQuery();
    if (!mediaQuery || this.getStoredTheme()) return;

    mediaQuery.addEventListener('change', () => {
      if (!this.getStoredTheme()) {
        const theme = this.getSystemTheme();
        this.theme.set(theme);
        this.applyTheme(theme);
      }
    });
  }

  private getSystemMediaQuery(): MediaQueryList | null {
    const window = this.document.defaultView;
    return window?.matchMedia?.('(prefers-color-scheme: dark)') ?? null;
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.dataset['theme'] = theme;
  }
}
