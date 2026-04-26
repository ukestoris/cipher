import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Textarea } from "./components/textarea/textarea";
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticalAnalysisService } from './services/statistical-analysis.service';
import { FrequencyDisplay } from "./components/frequency-display/frequency-display";
import { englishFrequencies } from './constants/english-frequencies';
import { numberDictEntryComparator } from './utils/number-dict-comparator';

@Component({
  selector: 'app-root',
  imports: [Textarea, ReactiveFormsModule, FrequencyDisplay],
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
}
