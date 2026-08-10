import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-timestamp',
  imports: [FormsModule, CopyButton, ToolHeader],
  template: `<div class="tool">
    <app-tool-header
      title="Timestamp Converter"
      description="Convert Unix timestamps and dates without leaving your browser."
    />
    <div class="form-stack">
      <div class="form-row">
        <label for="timestamp-input"
          >Timestamp or date<input
            id="timestamp-input"
            class="text-input"
            [(ngModel)]="input"
            placeholder="1710000000 or 2024-03-09" /></label
        ><label for="timestamp-unit"
          >Unit<select id="timestamp-unit" class="select-input" [(ngModel)]="unit">
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select></label
        >
      </div>
      <div class="actions">
        <button class="primary" type="button" (click)="toDate()">Timestamp to date</button
        ><button class="secondary" type="button" (click)="toTimestamp()">Date to timestamp</button
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
      <pre class="code-area output">{{ output || 'Conversion details will appear here.' }}</pre>
    </div>
  </div>`,
  styles: ['.output { margin: 0; min-height: 150px; }'],
})
export class TimestampConverter {
  protected input = '';
  protected unit: 'seconds' | 'milliseconds' = 'seconds';
  protected output = '';
  protected error = '';
  protected toDate(): void {
    const value = Number(this.input);
    if (!Number.isFinite(value)) {
      this.error = 'Enter a valid numeric timestamp.';
      return;
    }
    const date = new Date(this.unit === 'seconds' ? value * 1000 : value);
    if (Number.isNaN(date.getTime())) {
      this.error = 'Enter a valid timestamp.';
      return;
    }
    this.output = `UTC: ${date.toUTCString()}\nLocal: ${date.toString()}\nISO 8601: ${date.toISOString()}`;
    this.error = '';
  }
  protected toTimestamp(): void {
    const date = new Date(this.input);
    if (Number.isNaN(date.getTime())) {
      this.error = 'Enter a valid date or ISO 8601 value.';
      return;
    }
    const milliseconds = date.getTime();
    this.output = `Seconds: ${Math.floor(milliseconds / 1000)}\nMilliseconds: ${milliseconds}`;
    this.error = '';
  }
  protected clear(): void {
    this.input = '';
    this.output = '';
    this.error = '';
  }
}
