import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ToolHeader } from '../../../shared/components/tool-header/tool-header';

@Component({
  selector: 'app-uuid',
  imports: [FormsModule, CopyButton, ToolHeader],
  templateUrl: './uuid.html',
  styleUrl: './uuid.css',
})
export class UuidGenerator {
  protected count = 1;
  protected output = '';

  protected generate(): void {
    this.output = Array.from({ length: this.count }, () => crypto.randomUUID()).join('\n');
  }
}
