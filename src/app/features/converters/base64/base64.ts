import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-base64',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './base64.html',
  styleUrl: './base64.css',
})
export class Base64Tool {
  protected input = '';
  protected output = '';
  protected error = '';

  protected encode(): void {
    this.output = btoa(String.fromCharCode(...new TextEncoder().encode(this.input)));
    this.error = '';
  }

  protected decode(): void {
    try {
      const bytes = Uint8Array.from(atob(this.input.trim()), (char) => char.charCodeAt(0));
      this.output = new TextDecoder().decode(bytes);
      this.error = '';
    } catch {
      this.output = '';
      this.error = 'The input is not valid Base64.';
    }
  }

  protected clear(): void {
    this.input = '';
    this.output = '';
    this.error = '';
  }
}
