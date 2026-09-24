import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    window.localStorage.removeItem('utils-theme');
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({ providers: [ThemeService] });
  });

  afterEach(() => {
    window.localStorage.removeItem('utils-theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('applies and persists the selected theme', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('terminal');

    expect(service.theme()).toBe('terminal');
    expect(document.documentElement.dataset['theme']).toBe('terminal');
    expect(window.localStorage.getItem('utils-theme')).toBe('terminal');
  });
});
