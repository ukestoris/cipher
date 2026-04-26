import { Component } from '@angular/core';
import { Textarea } from "./components/textarea/textarea";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Textarea, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly cipherText = new FormControl('');
}
