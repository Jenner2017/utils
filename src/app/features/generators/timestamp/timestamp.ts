import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-timestamp',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './timestamp.html',
  styleUrl: './timestamp.css',
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
