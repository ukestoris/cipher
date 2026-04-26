import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrequencyDisplay } from "./components/frequency-display/frequency-display";
import { Textarea } from "./components/textarea/textarea";
import { englishFrequencies } from './constants/english-frequencies';
import { StatisticalAnalysisService } from './services/statistical-analysis.service';
import { numberDictEntryComparator } from './utils/number-dict-comparator';
import { LetterInput } from './components/letter-input/letter-input';

@Component({
  selector: 'app-root',
  imports: [Textarea, ReactiveFormsModule, LetterInput, FormsModule, FrequencyDisplay],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly statAnalysis = inject(StatisticalAnalysisService);
  readonly cipherText = this.statAnalysis.cipherTextControl;
  readonly letters = computed(() => {
    const counts = this.statAnalysis.counts(); 
    return Object.entries(counts).sort(numberDictEntryComparator).map(([letter]) => letter);
  });
  readonly counts = this.statAnalysis.counts;
  readonly frequencies = this.statAnalysis.frequencies;
  readonly englishFrequencies = Object.entries(englishFrequencies).sort(numberDictEntryComparator)
  readonly letterMapping: Record<string, string> = {};
  readonly decipheredText = signal<string>('');

  constructor() {
    effect(() => {
      this.statAnalysis.text();
      this.decipherText();
    });
  }

  onLetterGuess(letter: string, guess: string) {
    this.letterMapping[letter] = guess;
    this.decipherText();
  }

  decipherText() {
    const text = this.statAnalysis.text();
    if(!text) return;
    const result = [...text].map(letter => /\s/.test(letter) ? letter : (this.letterMapping[letter] || '*')).join('');
    this.decipheredText.set(result);
  }
}
