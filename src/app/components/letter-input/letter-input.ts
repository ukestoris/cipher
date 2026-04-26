import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControlComponent } from '../abstract/abstract-control';
import { cvaProvider } from '../../utils/cva-provider';

@Component({
  selector: 'app-letter-input',
  imports: [ReactiveFormsModule],
  templateUrl: './letter-input.html',
  providers: [cvaProvider(LetterInput)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetterInput extends AbstractControlComponent {
}
