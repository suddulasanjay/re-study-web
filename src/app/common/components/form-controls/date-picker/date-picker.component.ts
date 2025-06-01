import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFormControl } from '../base-form-control';

@Component({
  selector: 'app-date-picker',
  standalone : true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,ReactiveFormsModule,],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent extends BaseFormControl<Date> {
  @Input() label: string = 'Select Date';
  @Input() required: boolean = false;
  constructor() {
    super();
   }

  ngOnInit() {
  }

}
