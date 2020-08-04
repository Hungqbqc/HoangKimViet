import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConsts } from '@shared/AppConsts';
import { HttpClient } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  arrChungMinhThu = [
    { id: 1, displayName: 'Chứng minh thư' },
    { id: 2, displayName: 'Thẻ căn cước' }
  ];

  arrGioiTinh = [
    { id: 1, displayName: 'Nam' },
    { id: 2, displayName: 'Nữ' },
    { id: 3, displayName: 'Khác' }
  ];
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public http: HttpClient,
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
      chonLoaiCmt: [{ id: 1, displayName: 'Chứng minh thư' }],
      chungMinhThu: this.fb.group({
        soCmt: ['', Validators.required],
        hoTenCmt: ['', Validators.required],
        ngaySinhCmt: ['', Validators.required],
        nguyenQuanCmt: ['', Validators.required],
        noiDKHKThuongTruCmt: ['', Validators.required],
        danTocCmt: ['', Validators.required],
        tonGiaoCmt: ['', Validators.required],
        dacDiemNhanDangCmt: ['', Validators.required],
        ngayCapCmt: ['', Validators.required],
        noiCapCmt: ['', Validators.required],
        nguoiKyCmt: ['', Validators.required],
      }),
      theCanCuoc: this.fb.group({
        soCanCuoc: ['', Validators.required],
        hoVaTenCanCuoc: ['', Validators.required],
        ngaySinhCanCuoc: ['', Validators.required],
        gioiTinhCanCuoc: ['', Validators.required],
        quocTichCanCuoc: ['', Validators.required],
        queQuanCanCuoc: ['', Validators.required],
        noiThuongTruCanCuoc: ['', Validators.required],
        giaTriDenCanCuoc: ['', Validators.required],
        dacDiemNhanDangCanCuoc: ['', Validators.required],
        ngayCapCanCuoc: ['', Validators.required],
        noiCapCanCuoc: ['', Validators.required],
        nguoiCapCanCuoc: ['', Validators.required],
      }),
      giayKhaiSinh: this.fb.group({
        xaPhuongGKS: ['', Validators.required],
        quanHuyenGKS: ['', Validators.required],
        tinhThanhGKS: ['', Validators.required],
        mauGKS: ['', Validators.required],
        soGKS: ['', Validators.required],
        quyenSoGKS: ['', Validators.required],
        hoTenGKS: ['', Validators.required],
        gioiTinhGKS: ['', Validators.required],
        ngaySinhGKS: ['', Validators.required],
        ngaySinhBangChuGKS: ['', Validators.required],
        noiSinhGKS: ['', Validators.required],
        danTocGKS: ['', Validators.required],
        quocTichGKS: ['', Validators.required],
        queQuanGKS: ['', Validators.required],
        hoTenChaGKS: ['', Validators.required],
        danTocChaGKS: ['', Validators.required],
        quocTichChaGKS: ['', Validators.required],
        hoTenMeGKS: ['', Validators.required],
        danTocMeGKS: ['', Validators.required],
        quocTichMeGKS: ['', Validators.required],
        hoTenNguoiDiKhaiSinhGKS: ['', Validators.required],
        quanHeVoiNguoiDuocKhaiSinhGKS: ['', Validators.required],
        ngayDangKyGKS: ['', Validators.required],
        canBoTuPhapKyGKS: ['', Validators.required],
        chuTichThayMatKyGKS: ['', Validators.required],
        ngayKyGKS: ['', Validators.required],
        chuTichKyGKS: ['', Validators.required],
      }),
      soHoKhau: this.fb.group({
        soCanCuoc: ['', Validators.required],
      }),
      bangCap: this.fb.group({
        bangCap: ['', Validators.required],
      }),
      hoChieu: this.fb.group({
        soCanCuoc: ['', Validators.required],
      }),
      soYeuLyLich: this.fb.group({
        soCanCuoc: ['', Validators.required],
      }),
      BaoHiem: this.fb.group({
        soCanCuoc: ['', Validators.required],
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



}
