import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-hash',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './hash.html',
  styleUrl: './hash.css',
})
export class HashGenerator {
  protected input = '';
  protected algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256';
  protected output = '';
  protected error = '';

  protected async generate(): Promise<void> {
    try {
      const digest = await crypto.subtle.digest(
        this.algorithm,
        new TextEncoder().encode(this.input),
      );
      this.output = [...new Uint8Array(digest)]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      this.error = '';
    } catch {
      this.error = 'Could not generate the hash.';
    }
  }
}
