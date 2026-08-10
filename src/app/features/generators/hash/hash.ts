import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-hash',
  imports: [FormsModule, CopyButton, ToolHeader],
  template: `<div class="tool">
    <app-tool-header
      title="Hash Generator"
      description="Generate SHA digests using the browser's Web Crypto API."
    />
    <div class="form-stack">
      <label class="panel-label" for="hash-input">Input</label
      ><textarea
        id="hash-input"
        class="code-area"
        [(ngModel)]="input"
        placeholder="Type text to hash..."
        spellcheck="false"
      ></textarea>
      <div class="form-row">
        <label for="hash-algorithm"
          >Algorithm<select id="hash-algorithm" class="select-input" [(ngModel)]="algorithm">
            <option>SHA-256</option>
            <option>SHA-384</option>
            <option>SHA-512</option>
          </select></label
        ><button class="primary" type="button" (click)="generate()">Generate Hash</button>
      </div>
      @if (error) {
        <p class="error" role="alert">{{ error }}</p>
      }
      <div class="panel-label">
        <span>Output</span>
        @if (output) {
          <app-copy-button [text]="output" />
        }
      </div>
      <pre class="code-area output">{{ output || 'Hash will appear here.' }}</pre>
    </div>
  </div>`,
  styles: ['.output { margin: 0; min-height: 120px; word-break: break-all; }'],
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
