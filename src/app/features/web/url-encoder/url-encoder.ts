import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-url-encoder',
  imports: [FormsModule, CopyButton, ToolHeader],
  template: `<div class="tool">
    <app-tool-header
      title="URL Encode / Decode"
      description="Encode URL text and inspect query parameters locally."
    />
    <div class="form-stack">
      <label class="panel-label" for="url-input">Input</label
      ><textarea
        id="url-input"
        class="code-area"
        [(ngModel)]="input"
        placeholder="hola mundo & prueba"
        spellcheck="false"
      ></textarea>
      <div class="actions">
        <button class="primary" type="button" (click)="encode()">URL Encode</button
        ><button class="secondary" type="button" (click)="decode()">URL Decode</button
        ><button class="quiet" type="button" (click)="inspect()">Show Parameters</button
        ><button class="quiet" type="button" (click)="clear()">Clear</button>
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
      <pre class="code-area output">{{ output || 'Result will appear here.' }}</pre>
    </div>
  </div>`,
  styles: ['.output { margin: 0; min-height: 170px; }'],
})
export class UrlEncoder {
  protected input = '';
  protected output = '';
  protected error = '';
  protected encode(): void {
    try {
      this.output = encodeURIComponent(this.input);
      this.error = '';
    } catch {
      this.error = 'Could not encode the input.';
    }
  }
  protected decode(): void {
    try {
      this.output = decodeURIComponent(this.input);
      this.error = '';
    } catch {
      this.output = '';
      this.error = 'The input contains an invalid URL encoding.';
    }
  }
  protected inspect(): void {
    try {
      const params = new URL(this.input).searchParams;
      this.output =
        [...params.entries()].map(([key, value]) => `${key} = ${value}`).join('\n') ||
        'No query parameters found.';
      this.error = '';
    } catch {
      this.output = '';
      this.error = 'Enter a complete URL to inspect its parameters.';
    }
  }
  protected clear(): void {
    this.input = '';
    this.output = '';
    this.error = '';
  }
}
