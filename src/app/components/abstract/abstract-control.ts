import { Directive, inject, Injector, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive()
export class AbstractControlComponent implements ControlValueAccessor {
  private readonly injector = inject(Injector);
  private onChange: any;
  private onTouched: any;

  readonly id = input<string>();
  readonly label = input<string>();

  protected control!: FormControl; 
  
  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    this.control = ngControl.control as FormControl;
  }

  writeValue(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}