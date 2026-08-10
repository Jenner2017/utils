import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-uuid',
  imports: [FormsModule, CopyButton, ToolHeader],
  template: `<div class="tool">
    <app-tool-header
      title="UUID Generator"
      description="Generate cryptographically random UUID v4 values locally."
    />
    <div class="form-stack">
      <div class="form-row">
        <label for="uuid-count"
          >Quantity<select id="uuid-count" class="select-input" [(ngModel)]="count">
            <option [ngValue]="1">1</option>
            <option [ngValue]="5">5</option>
            <option [ngValue]="10">10</option>
          </select></label
        ><button class="primary" type="button" (click)="generate()">Generate UUIDs</button>
      </div>
      @if (output) {
        <div class="panel-label"><span>Output</span><app-copy-button [text]="output" /></div>
      }
      <pre class="code-area output">{{ output || 'Generated UUIDs will appear here.' }}</pre>
    </div>
  </div>`,
  styles: ['.output { margin: 0; min-height: 150px; }'],
})
export class UuidGenerator {
  protected count = 1;
  protected output = '';
  protected generate(): void {
    this.output = Array.from({ length: this.count }, () => crypto.randomUUID()).join('\n');
  }
}
