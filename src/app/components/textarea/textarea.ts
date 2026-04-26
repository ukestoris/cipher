import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControlComponent } from '../abstract/abstract-control';
import { cvaProvider } from '../../utils/cva-provider';

@Component({
  selector: 'app-textarea',
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
  providers: [cvaProvider(Textarea)],
})
export class Textarea extends AbstractControlComponent {}
