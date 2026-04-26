import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StatisticalAnalysisService {
  readonly cipherTextControl = new FormControl('');

  readonly text = toSignal(this.cipherTextControl.valueChanges.pipe(map(text => text?.toUpperCase())));

  readonly sanitizedText = computed(() => {
        const text= this.text();
        return text?.replaceAll(/\s/g, '');
    });

  readonly counts = computed(() => { 
        const text = this.sanitizedText();
        if (text) {
            return [...text].reduce((counts, letter) => {
                counts[letter] = (counts[letter] ?? 0) + 1;
                return counts;
            }, {} as Record<string, number>);
        }
        return {};
    });

  readonly frequencies = computed(() => {
    const length = this.sanitizedText()?.length ?? 0;
    const counts = this.counts();
    if(!length) return {};
    return Object.fromEntries(Object.entries(counts).map(([letter, count]) => [letter, count / length]));
  })
}