// tslint:disable
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
    selector: '<dft-validation>',
    template: `
     <div class="valid-height">
                <div *ngIf="control?.touched || control?.dirty "> 
                    <span  class="text-danger" >
                     {{message}}
                    </span>
                </div>
    </div>
    `
})
export class ValidationComponent {

    public static KtraSoNguyen(control: AbstractControl) {
        try {
            // nếu k phai số trả về true
            if (control.value != null) {
                if (/[^0-9]+/.test(control.value)) {
                    return { pattern: true };
                }
            }
            return null;
        } catch (error) {

        }
    }

    @Input() control;
    constructor() { }
    get message() {
        try {
            if (this.control.errors) {
                for (const err in this.control.errors) {
                    if (this.control.errors.hasOwnProperty(err)) {
                        return this.getErrorMessage(err);
                    }
                }
            }
        } catch (error) {

        }
    }

    getErrorMessage(err) {
        const messages = {
            'required': 'Đây là trường bắt buộc', // Đây là trường bắt buộc
            'isEndMin': 'Thời gian phải lớn hơn hoặc bằng ngày bắt đầu', // Thời gian phải lớn hơn hoặc bằng ngày bắt đầu
            'isStartMax': 'Thời gian phải nhỏ hơn hoặc bằng ngày kết thúc', // Thời gian phải nhỏ hơn hoặc bằng ngày kết thúc
            'isMax': 'Thời gian phải nhỏ hơn hoặc bằng ngày hiện tại',   // Thời gian phải nhỏ hơn hoặc bằng ngày hiện tại
            'pattern': 'Không đúng định dạng',   // Không đúng định dạng
            'isMin': 'Thời gian phải lớn hơn hoặc bằng ngày hiện tại',   // Thời gian phải lớn hơn hoặc bằng ngày hiện tại
            'isStartMaxLtg': 'Thời gian phải nhỏ hơn ngày kết thúc', // Thời gian phải nhỏ hơn ngày kết thúc
            'isEndMinLtg': 'Thời gian phải lớn hơn ngày bắt đầu', // Thời gian phải lớn hơn ngày bắt đầu
            'isDenNgaymax': 'Thời gian phải nhỏ hơn thời gian đến ngày', // Thời gian phải nhỏ hơn thời gian đến ngày
            'isTuNgaymin': 'Thời gian phải lớn hơn thời gian từ ngày', // Thời gian phải lớn hơn thời gian từ ngày
            'email': 'Email không đúng định dạng',
            'phone': 'SĐT không đúng định dạng',
            'url': 'URL không đúng định dạng',
        };
        return messages[err];
    }
}
