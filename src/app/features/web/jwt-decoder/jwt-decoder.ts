import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

interface JwtPart {
  text: string;
  data: string;
}
@Component({
  selector: 'app-jwt-decoder',
  imports: [FormsModule, CopyButton, ToolHeader],
  template: `<div class="tool">
    <app-tool-header
      title="JWT Decoder"
      description="Decode JWT header and payload locally. Signature verification is not performed."
    />
    <p class="hint warning">Decoding a JWT does not verify its signature.</p>
    <div class="form-stack">
      <label class="panel-label" for="jwt-input">Token</label
      ><textarea
        id="jwt-input"
        class="code-area"
        [(ngModel)]="token"
        (ngModelChange)="decode()"
        placeholder="Paste a JWT here..."
        spellcheck="false"
      ></textarea>
      @if (error) {
        <p class="error" role="alert">{{ error }}</p>
      }
      @if (header || payload) {
        <div class="workbench">
          <section class="panel">
            <div class="panel-label"><span>Header</span><app-copy-button [text]="header" /></div>
            <pre class="code-area output">{{ header }}</pre>
          </section>
          <section class="panel">
            <div class="panel-label"><span>Payload</span><app-copy-button [text]="payload" /></div>
            <pre class="code-area output">{{ payload }}</pre>
          </section>
        </div>
      }
      @if (dates.length) {
        <div class="metadata">
          @for (date of dates; track date.name) {
            <span
              ><b>{{ date.name }}</b> {{ date.value }}</span
            >
          }
        </div>
      }
    </div>
  </div>`,
  styles: [
    '.warning { margin: -22px 0 25px; color: var(--text-muted); } .output { margin: 0; min-height: 190px; } .metadata { display: flex; flex-wrap: wrap; gap: 9px 20px; margin-top: 20px; color: var(--text-muted); font-size: 12px; } .metadata b { color: var(--text); font-weight: 500; }',
  ],
})
export class JwtDecoder {
  protected token = '';
  protected header = '';
  protected payload = '';
  protected error = '';
  protected dates: { name: string; value: string }[] = [];
  protected decode(): void {
    this.error = '';
    this.header = '';
    this.payload = '';
    this.dates = [];
    if (!this.token.trim()) return;
    try {
      const parts = this.token.trim().split('.');
      if (parts.length !== 3) throw new Error();
      this.header = JSON.stringify(this.parse(parts[0]), null, 2);
      const data = this.parse(parts[1]);
      this.payload = JSON.stringify(data, null, 2);
      const record = data as Record<string, unknown>;
      this.dates = ['iat', 'nbf', 'exp']
        .filter((key) => typeof record[key] === 'number')
        .map((key) => ({
          name: key,
          value:
            new Date(Number(record[key]) * 1000).toLocaleString() +
            (key === 'exp' && Number(record[key]) * 1000 < Date.now() ? ' (expired)' : ''),
        }));
    } catch {
      this.error = 'This is not a valid decodable JWT.';
    }
  }
  private parse(value: string): unknown {
    const normalized = value
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(value.length / 4) * 4, '=');
    return JSON.parse(
      new TextDecoder().decode(Uint8Array.from(atob(normalized), (char) => char.charCodeAt(0))),
    );
  }
}
