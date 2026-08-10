import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-xml-json',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './xml-json.html',
  styleUrl: './xml-json.css',
})
export class XmlJson {
  protected input = '';
  protected output = '';
  protected error = '';

  protected convert(direction: 'xml' | 'json'): void {
    try {
      const parsed = direction === 'json' ? JSON.parse(this.input) : null;
      this.output =
        direction === 'xml'
          ? JSON.stringify(this.xmlToObject(this.input), null, 2)
          : this.objectToXml(this.unwrapRoot(parsed));
      this.error = '';
    } catch {
      this.output = '';
      this.error = 'The input is not valid XML or JSON.';
    }
  }

  protected clear(): void {
    this.input = '';
    this.output = '';
    this.error = '';
  }

  private xmlToObject(source: string): unknown {
    const doc = new DOMParser().parseFromString(source, 'application/xml');
    if (doc.querySelector('parsererror') || !doc.documentElement) throw new Error('Invalid XML');
    return { [doc.documentElement.tagName]: this.elementValue(doc.documentElement) };
  }

  private unwrapRoot(value: unknown): unknown {
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length === 1 &&
      Object.hasOwn(value, 'root')
    ) {
      return (value as Record<string, unknown>)['root'];
    }

    return value;
  }

  private elementValue(element: Element): unknown {
    const children = [...element.children];
    if (!children.length) return element.textContent?.trim() ?? '';

    const result: Record<string, unknown> = {};
    for (const child of children) {
      const value = this.elementValue(child);
      result[child.tagName] =
        result[child.tagName] === undefined
          ? value
          : ([] as unknown[]).concat(result[child.tagName], value);
    }
    return result;
  }

  private objectToXml(value: unknown, root = 'root'): string {
    if (Array.isArray(value)) return value.map((item) => this.objectToXml(item, root)).join('');
    if (value !== null && typeof value === 'object') {
      return `<${root}>${Object.entries(value)
        .map(([key, item]) => this.objectToXml(item, key))
        .join('')}</${root}>`;
    }
    return `<${root}>${this.escapeXml(String(value ?? ''))}</${root}>`;
  }

  private escapeXml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
