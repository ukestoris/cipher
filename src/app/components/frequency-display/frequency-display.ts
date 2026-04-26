import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-frequency-display',
  imports: [DecimalPipe],
  templateUrl: './frequency-display.html',
  styleUrl: './frequency-display.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrequencyDisplay {
  readonly letter = input<string>();
  readonly frequency = input<number>(); 
  readonly count = input<number>();
}
