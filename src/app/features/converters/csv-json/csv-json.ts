import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-csv-json',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './csv-json.html',
  styleUrl: './csv-json.css',
})
export class CsvJson {
  protected input = '';
  protected output = '';
  protected error = '';

  protected convert(direction: 'csv' | 'json'): void {
    try {
      this.output =
        direction === 'csv'
          ? JSON.stringify(this.parseCsv(this.input), null, 2)
          : this.toCsv(JSON.parse(this.input));
      this.error = '';
    } catch {
      this.output = '';
      this.error = 'Could not convert the provided content.';
    }
  }

  protected clear(): void {
    this.input = '';
    this.output = '';
    this.error = '';
  }

  private parseCsv(source: string): Record<string, unknown>[] {
    const rows = this.parseRows(source);
    const headers = rows.shift()?.map((header) => header.trim());
    if (!headers?.length) throw new Error();

    return rows
      .filter((row) => row.some((value) => value.length > 0))
      .map((row) => {
        const record: Record<string, unknown> = {};
        headers.forEach((header, index) => this.assignPath(record, header, row[index] ?? ''));
        return record;
      });
  }

  private parseRows(source: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let value = '';
    let quoted = false;

    for (let index = 0; index < source.length; index++) {
      const char = source[index];

      if (char === '"') {
        if (quoted && source[index + 1] === '"') {
          value += '"';
          index++;
        } else {
          quoted = !quoted;
        }
      } else if (char === ',' && !quoted) {
        row.push(value);
        value = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && source[index + 1] === '\n') index++;
        row.push(value);
        rows.push(row);
        row = [];
        value = '';
      } else {
        value += char;
      }
    }

    if (quoted) throw new Error();
    if (value.length > 0 || row.length > 0) {
      row.push(value);
      rows.push(row);
    }

    return rows;
  }

  private assignPath(record: Record<string, unknown>, path: string, value: string): void {
    const segments = path.split('/');
    if (segments.some((segment) => segment.length === 0)) throw new Error();
    this.assignObjectPath(record, segments, value);
  }

  private assignObjectPath(
    record: Record<string, unknown>,
    segments: string[],
    value: string,
  ): void {
    const [segment, ...remaining] = segments;
    if (!segment) throw new Error();

    if (remaining.length === 0) {
      record[segment] = value;
      return;
    }

    if (record[segment] === undefined) {
      record[segment] = /^\d+$/.test(remaining[0]) ? [] : {};
    }

    if (Array.isArray(record[segment])) {
      this.assignArrayPath(record[segment], remaining, value);
    } else if (typeof record[segment] === 'object' && record[segment] !== null) {
      this.assignObjectPath(record[segment] as Record<string, unknown>, remaining, value);
    } else {
      throw new Error();
    }
  }

  private assignArrayPath(array: unknown[], segments: string[], value: string): void {
    const [segment, ...remaining] = segments;
    const index = Number(segment);
    if (!/^\d+$/.test(segment) || !Number.isSafeInteger(index)) throw new Error();

    if (remaining.length === 0) {
      array[index] = value;
      return;
    }

    if (array[index] === undefined) {
      array[index] = /^\d+$/.test(remaining[0]) ? [] : {};
    }

    if (Array.isArray(array[index])) {
      this.assignArrayPath(array[index], remaining, value);
    } else if (typeof array[index] === 'object' && array[index] !== null) {
      this.assignObjectPath(array[index] as Record<string, unknown>, remaining, value);
    } else {
      throw new Error();
    }
  }

  private toCsv(value: unknown): string {
    if (
      !Array.isArray(value) ||
      !value.length ||
      value.some((item) => item === null || typeof item !== 'object' || Array.isArray(item))
    ) {
      throw new Error();
    }

    const keys = [...new Set(value.flatMap((item) => Object.keys(item as object)))];
    const rows = value.map((item) =>
      keys.map((key) => this.csvValue((item as Record<string, unknown>)[key])).join(','),
    );
    return [keys.join(','), ...rows].join('\n');
  }

  private csvValue(value: unknown): string {
    const text = value == null ? '' : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }
}
