import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'json/formatter' },
  {
    path: 'json/formatter',
    loadComponent: () =>
      import('./features/json/json-formatter/json-formatter').then((m) => m.JsonFormatter),
  },
  {
    path: 'json/escape',
    loadComponent: () =>
      import('./features/json/json-escape/json-escape').then((m) => m.JsonEscape),
  },
  {
    path: 'converters/xml-json',
    loadComponent: () => import('./features/converters/xml-json/xml-json').then((m) => m.XmlJson),
  },
  {
    path: 'converters/csv-json',
    loadComponent: () => import('./features/converters/csv-json/csv-json').then((m) => m.CsvJson),
  },
  {
    path: 'converters/base64',
    loadComponent: () => import('./features/converters/base64/base64').then((m) => m.Base64Tool),
  },
  {
    path: 'web/jwt',
    loadComponent: () => import('./features/web/jwt-decoder/jwt-decoder').then((m) => m.JwtDecoder),
  },
  {
    path: 'web/url',
    loadComponent: () => import('./features/web/url-encoder/url-encoder').then((m) => m.UrlEncoder),
  },
  {
    path: 'generators/uuid',
    loadComponent: () => import('./features/generators/uuid/uuid').then((m) => m.UuidGenerator),
  },
  {
    path: 'generators/hash',
    loadComponent: () => import('./features/generators/hash/hash').then((m) => m.HashGenerator),
  },
  {
    path: 'generators/timestamp',
    loadComponent: () =>
      import('./features/generators/timestamp/timestamp').then((m) => m.TimestampConverter),
  },
  { path: '**', redirectTo: 'json/formatter' },
];
