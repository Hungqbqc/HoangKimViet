import { ElementRef, AfterViewInit, Input, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: '<dft-label-validation>',
    template: `  <label
                    [class]="form?.get(control)?.errors && ( form?.get(control)?.touched || form?.get(control)?.dirty)  ? 'text-danger' : 'text-ok'"  id="control">{{title}}
                </label>
    `
})
export class LabelValidationComponent {
    @Input() form: FormGroup;
    @Input() control: '';
    @Input() title: '';

    constructor() {

    }
}
