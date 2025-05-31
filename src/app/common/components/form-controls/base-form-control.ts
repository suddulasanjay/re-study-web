import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseFormControl<T = any> implements ControlValueAccessor {
  value!: T;
  disabled = false;
  onChange = (value: T) => {};
  onTouched = () => {};

  writeValue(obj: T): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Optional helper method
  protected emitValue(value: T) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
