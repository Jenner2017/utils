import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-json-escape',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './json-escape.html',
  styleUrl: './json-escape.css',
})
export class JsonEscape {
  protected input = '';
  protected output = '';
  protected error = '';
  protected escape(): void {
    this.output = JSON.stringify(this.input).slice(1, -1);
    this.error = '';
  }
  protected unescape(): void {
    try {
      this.output = JSON.parse(`"${this.input}"`);
      this.error = '';
    } catch {
      this.output = '';
      this.error = 'The input contains invalid escape sequences.';
    }
  }
  protected clear(): void {
    this.input = '';
    this.output = '';
    this.error = '';
  }
}
