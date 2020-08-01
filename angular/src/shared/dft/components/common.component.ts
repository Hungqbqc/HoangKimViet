import { FormGroup, FormArray, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
export class CommonComponent {

    public static getDateForEditFromMoment(date: moment.Moment, format = 'YYYY/MM/DD') {
        return date ? new Date(moment(date).format(format)) : null;
    }

    public static getDateTimeForEditFromMoment(date: moment.Moment, format = 'YYYY/MM/DD HH:mm:ss') {
        return date ? new Date(moment(date).format(format)) : null;
    }

    public static getDateForEditFromString(date: string) {
        return new Date(date);
    }

    public static getTimeEditFromString(time: string) {
        return time === '' ? new Date('2020-01-01 ' + time) : null;
    }

    // Hàm viets hoa hết
    public static vietHoa(e) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const temp = e.target.value.toUpperCase();
        e.target.value = temp;
        e.target.selectionStart = start;
        e.target.selectionEnd = end;
        return e.target.value;
    }

    // Hàm viết hoa chữ đầu
    public static vietHoaChuDau(e) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const strs = e.target.value.split(' ');
        const res = [];
        strs.forEach(element => {
            res.push(this.capitalizeFirstLetter(element));
        });
        const temp = res.join(' ');
        e.target.value = temp;
        e.target.selectionStart = start;
        e.target.selectionEnd = end;
        return e.target.value;
    }

    public static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // truyền vào selector , thuộc tính , giá trị để set cho control đó
    public static setAttribute(selector, att, value) {
        $(document).ready(() => {
            const b = document.querySelector(selector);
            b.setAttribute(att, value);
        });
    }

    // Truyền vào id để focus
    public static autoFocus(id: string) {
        $('#' + id).focus();
    }

    public static controlChange(form: FormGroup, control1: string, control2: string) {
        form.get(control1).valueChanges.subscribe(val => {
            form.get(control1).markAsUntouched({ onlySelf: true });
            if (form.get(control2).value !== '') {
                form.get(control2).markAsTouched({ onlySelf: true });
            }

        });
        form.get(control2).valueChanges.subscribe(val => {
            form.get(control2).markAsUntouched({ onlySelf: true });
            if (form.get(control1).value !== '') {
                form.get(control1).markAsTouched({ onlySelf: true });
            }
        });
    }

    // truyền vào 1 formGroup để reset hết các control có lỗi
    public static formReset(form: FormGroup) {
        try {
            for (const control in form.controls) {
                if (form.get(control).errors) {
                    form.get(control).reset();
                }
            }
        } catch (error) {

        }
    }

    // truyền vào 1 formGroup để lấy trả vể chuôi = tên control có lỗi
    public static getControlErr(form: FormGroup) {
        try {
            let check = '';
            for (const control in form.controls) {
                if (form.get(control).errors) {
                    check = control;
                    break;
                }
            }
            if (check !== '') {
                for (const control in form.controls) {
                    if (form.controls.hasOwnProperty(control)) {
                        form.get(control).markAsTouched({ onlySelf: true });
                    }
                }
                CommonComponent.autoFocus(check);
                return check;
            } else {
                return '';
            }
        } catch (error) {

        }
    }


    // tslint:disable-next-line: cognitive-complexity
    public static getControlArrErr(form: FormArray, length: number) {
        try {
            let check = '';
            // BAT CO LOI TRUONG DAU TIEN
            form['controls'].forEach((item: FormGroup, yi: number) => {
                if (item.invalid) {
                    for (const control_yi in item.controls) {
                        if (item.get(control_yi).errors) {
                            check = `${control_yi}_${yi}`;
                            break;
                        }
                    }
                }
            });
            // DANH DAU TAT CA CAC INPUT LOI
            if (!_.isUndefined(check) && !_.isNull(check)) {
                form['controls'].forEach((element: FormGroup) => {
                    for (const control_xi in element.controls) {
                        // TRƯỜNG HỢP FORMCONTROL
                        if (element.get(control_xi) instanceof FormControl) {
                            element.get(control_xi).markAsTouched();
                        }
                    }
                });
            }
            return check;
        } catch (error) {

        }
    }

    public static getNgayDauTienCuaThangHienTai() {
        return moment().startOf('month');
    }

    public static getNgayCuoiCungCuaThang(ngayDauThang, format = 'DD/MM/YYYY') {
        return moment(ngayDauThang, format).endOf('month');
    }

}

