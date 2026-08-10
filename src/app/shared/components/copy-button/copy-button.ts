import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.css',
})
export class CopyButton {
  readonly text = input.required<string>();
  protected readonly copied = signal(false);
  protected readonly copyFailed = signal(false);

  protected async copy(): Promise<void> {
    this.copied.set(false);
    this.copyFailed.set(false);

    try {
      await navigator.clipboard.writeText(this.text());

      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1400);
    } catch {
      this.copyFailed.set(true);
      setTimeout(() => this.copyFailed.set(false), 1800);
    }
  }
}
