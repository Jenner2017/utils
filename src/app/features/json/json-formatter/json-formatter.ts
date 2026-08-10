import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-json-formatter',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.css',
})
export class JsonFormatter {
  protected input = '';
  protected readonly output = signal('');
  protected readonly error = signal('');

  protected format(minify = false): void {
    try {
      const value: unknown = JSON.parse(this.input);
      this.output.set(JSON.stringify(value, null, minify ? 0 : 2));
      this.error.set('');
    } catch (error: unknown) {
      this.output.set('');
      this.error.set(this.parseError(error));
    }
  }
  protected clear(): void {
    this.input = '';
    this.output.set('');
    this.error.set('');
  }
  private parseError(error: unknown): string {
    const message = error instanceof SyntaxError ? error.message : 'Invalid JSON.';
    const position = message.match(/position (\d+)/i)?.[1];
    return position ? `Invalid JSON near character ${position}. ${message}` : message;
  }
}
