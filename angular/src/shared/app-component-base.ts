// tslint:disable
import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import {
    LocalizationService,
    PermissionCheckerService,
    FeatureCheckerService,
    NotifyService,
    SettingService,
    MessageService,
    AbpMultiTenancyService
} from 'abp-ng2-module';

import { AppSessionService } from '@shared/session/app-session.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    elementRef: ElementRef;
    paginatorRows = 20; // Số dòng hiển thị mặc định 1 page
    rowsPerPageOptions = [20, 50, 100, 250]; // Chọn số record trong 1 page
    scrollHeight = '500px';  // độ rộng để table cuộn tùy theo màn hình
    separator = ',';
    // datetime
    dateFormatInput = 'dd/mm/yy'; // format cho định dạng date
    dateFormatInsert = 'YYYY-MM-DD'; // format cho định dạng date để insert vào db
    dateTimeFormatInsert = 'YYYY-MM-DD HH:mm:ss'; // format cho định dạng date để insert vào db
    dateFormatMonthOnlyInput = 'mm/yy'; // format cho định dạng date
    dateFormatMonthOnlyInsert = 'YYYY-MM'; // format cho định dạng date
    hourFormat12Input = '12';     // Time định dạng 12h
    hourFormat24Input = '24';     // Time định dạng 24h
    timeFormatInsert = 'HH:mm'; // Khoảng năm từ 2020-2030
    yearRange = '2020:2030'; // Khoảng năm từ 2020-2030
    today = new Date();      // Ngày hôm nay
    readonlyInput = true;    // Không cho date được nhập
    showButtonBar = true;    // Hiển thị nút today và clear
    scrollable = true;       // Có cuộn table không
    minFractionDigits = 2;
    maxFractionDigits = 2;
    swal = Swal;
    excelAcceptTypes = '.xlsx,.xls';
    imateAcceptTypes = 'image/*';
    confirmButtonColor = '#3085d6';
    cancelButtonColor = '#d33';
    cancelButtonText = 'Hủy';
    confirmButtonText = 'Có';
    khongCoDuLieu = 'Không có dữ liệu';
    dropdownPlaceholder = '--- Chọn ---';

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.elementRef = injector.get(ElementRef);
    }

    l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, this.localizationSourceName);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    isGrantedAny(...permissions: string[]): boolean {
        if (!permissions) {
            return false;
        }

        for (const permission of permissions) {
            if (this.isGranted(permission)) {
                return true;
            }
        }

        return false;
    }

    showCreateMessage() {
        this.swal.fire(
            undefined,
            'Thêm mới thành công!',
            'success'
        );
    }

    showUpdateMessage() {
        this.swal.fire(
            undefined,
            'Sửa thành công!',
            'success'
        );
    }

    showDeleteMessage() {
        this.swal.fire(
            undefined,
            'Xóa thành công!',
            'success'
        );
    }

    showUploadMessage() {
        this.swal.fire(
            undefined,
            'Upload thành công!',
            'success'
        );
    }

}
