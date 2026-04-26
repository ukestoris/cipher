import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StatisticalAnalysisService {
  readonly cipherTextControl = new FormControl('');

  readonly text = toSignal(this.cipherTextControl.valueChanges.pipe(map(text => text?.replaceAll(/\s/g, '').toUpperCase())));

  readonly counts = computed(() => { 
        const text = this.text();
        if (text) {
            return [...text].reduce((counts, letter) => {
                counts[letter] = (counts[letter] ?? 0) + 1;
                return counts;
            }, {} as Record<string, number>);
        }
        return {};
    });

  readonly frequencies = computed(() => {
    const length = this.text()?.length ?? 0;
    const counts = this.counts();
    if(!length) return {};
    return Object.fromEntries(Object.entries(counts).map(([letter, count]) => [letter, count / length]));
  })
}