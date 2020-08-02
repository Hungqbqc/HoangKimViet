import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookupTableDto, DemoCreateInput, Demo_File, LookupTableServiceProxy, DemoServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { HttpClient } from '@angular/common/http';
import { FileDownloadService } from '@shared/file-download.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { CommonComponent } from '@shared/dft/components/common.component';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-create-or-edit-ho-so',
  templateUrl: './create-or-edit-ho-so.component.html',
})
export class CreateOrEditHoSoComponent extends AppComponentBase
  implements OnInit {
  @Output() onSave = new EventEmitter<any>();
  form: FormGroup;
  saving = false;

  id: number;
  isView: boolean;
  linkServer = AppConsts.remoteServiceBaseUrl;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public http: HttpClient,
    private _fileDownloadService: FileDownloadService,
    private _lookupTableService: LookupTableServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.khoiTaoForm();
    // forkJoin(
    //   this._lookupTableService.getAllTrangThaiHieuLuc(),
    //   this._lookupTableService.getAllTrangThaiDuyet(),
    //   this._lookupTableService.getAllDemo()
    // ).subscribe(([trangThaiHieuLuc, trangThaiDuyet, demo]) => {
    //   this.arrTrangHieuLuc = trangThaiHieuLuc;
    //   this.arrTrangThaiDuyet = trangThaiDuyet;
    //   this.demos = demo;

    //   // Calendar
    //   const invalidDate = new Date();
    //   invalidDate.setDate(this.today.getDate() - 5);
    //   this.invalidDates = [this.today, invalidDate];

    //   // ProgressBar
    //   const interval = setInterval(() => {
    //     this.value = this.value + Math.floor(Math.random() * 10) + 1;
    //     if (this.value >= 100) {
    //       this.value = 100;
    //       clearInterval(interval);
    //     }
    //   }, 1000);
    //   if (!this.id) {
    //     // Thêm mới
    //     this.demoDto = new DemoCreateInput();
    //   } else {
    //     // Sửa
    //     this._demoService.getForEdit(this.id).subscribe(item => {
    //       this.demoDto = item;
    //       this.setValueForEdit();
    //     });
    //   }
    //   if (this.isView) {
    //     this.form.disable();
    //   } else {
    //     this.form.enable();
    //   }
    // });
  }

  khoiTaoForm() {
    this.form = this.fb.group({
      ChungMinhThu: this.fb.group({
        SoCmt: ['', Validators.required],
        HoTenCmt: ['', Validators.required],
        NgaySinhCmt: ['', Validators.required],
        NguyenQuanCmt: ['', Validators.required],
        NoiDKHKThuongTruCmt: ['', Validators.required],
        DanTocCmt: ['', Validators.required],
        TonGiaoCmt: ['', Validators.required],
        DacDiemNhanDangCmt: ['', Validators.required],
        NgayCapCmt: ['', Validators.required],
        NoiCapCmt: ['', Validators.required],
        GioiTinhCmt: ['', Validators.required],
      }),
      TheCanCuoc: this.fb.group({
      }),
      GiayKhaiSinh: this.fb.group({
      }),
      SoHoKhau: this.fb.group({
      }),
      BangCap: this.fb.group({
      }),
      HoCHieu: this.fb.group({
      }),
      SoYeuLyLich: this.fb.group({
      }),
      BaoHiem: this.fb.group({
      }),
    });
  }

  save(): void {
    // if (CommonComponent.getControlErr(this.form) === '') {
    //   const formdata = new FormData();
    //   formdata.append('ma', this.form.controls.TextBox1.value);
    //   for (let i = 0; i < this.filesAll.length; i++) {
    //     formdata.append((i + 1) + '', this.filesAll[i]);
    //   }
    //   this.http.post(URL, formdata).subscribe((res) => {
    //     this.getValueForSave();
    //     this.demoDto.listDemoFile = [];
    //     for (const file of this.filesAll) {
    //       const item = new Demo_File();
    //       item.tenFile = file.name;
    //       item.linkFile = '\\' + this.demoDto.ma + '\\' + res['result'][res['result']
    //         .findIndex(e => e.includes(file.name))].split('\\').slice(-1)[0];
    //       this.demoDto.listDemoFile.push(item);
    //     }
    //     this._demoService.createOrEdit(this.demoDto).pipe(
    //       finalize(() => {
    //         this.saving = false;
    //       })
    //     ).subscribe(() => {
    //       if (!this.id) {
    //         this.showCreateMessage();
    //         this.bsModalRef.hide();
    //         this.onSave.emit();
    //       } else {
    //         this.showUpdateMessage();
    //         this.bsModalRef.hide();
    //         this.onSave.emit();
    //       }
    //     });
    //   });
    // }
  }


  close() {
    this.bsModalRef.hide();
  }


  private setValueForEdit() {

  }

  private getValueForSave() {

  }
}
