import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}
interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly menuOpen = signal(false);
  protected readonly groups: NavGroup[] = [
    {
      label: 'JSON',
      items: [
        { label: 'JSON Formatter', path: '/json/formatter' },
        { label: 'JSON Escape', path: '/json/escape' },
      ],
    },
    {
      label: 'CONVERTERS',
      items: [
        { label: 'XML ↔ JSON', path: '/converters/xml-json' },
        { label: 'CSV ↔ JSON', path: '/converters/csv-json' },
        { label: 'Base64', path: '/converters/base64' },
      ],
    },
    {
      label: 'WEB',
      items: [
        { label: 'JWT Decoder', path: '/web/jwt' },
        { label: 'URL Encode / Decode', path: '/web/url' },
      ],
    },
    {
      label: 'GENERATORS',
      items: [
        { label: 'UUID Generator', path: '/generators/uuid' },
        { label: 'Hash Generator', path: '/generators/hash' },
        { label: 'Timestamp Converter', path: '/generators/timestamp' },
      ],
    },
  ];
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
