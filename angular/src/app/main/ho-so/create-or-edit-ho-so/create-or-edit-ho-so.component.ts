import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConsts } from '@shared/AppConsts';
import { HttpClient } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HoSoKhachHangServiceProxy, HoSoKhachHangDto } from '@shared/service-proxies/service-proxies';
import { CommonComponent } from '@shared/dft/components/common.component';
import { finalize } from 'rxjs/operators';

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
  hoSoKhachHangDto: HoSoKhachHangDto;
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
    private http: HttpClient,
    private hoSoKhachHang: HoSoKhachHangServiceProxy,
    private bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.khoiTaoForm();
    if (!this.id) {
      // Thêm mới
      this.hoSoKhachHangDto = new HoSoKhachHangDto();
    } else {
      // Sửa
      this.hoSoKhachHang.get(this.id).subscribe(item => {
        this.hoSoKhachHangDto = item;
        this.setValueForEdit();
      });
    }
    if (this.isView) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  khoiTaoForm() {
    // this.form = this.fb.group({
    //   loaiGiayTo: [{ id: 1, displayName: 'Chứng minh thư' }],
    //   chungMinhThu: this.fb.group({
    //     soCmt: ['', Validators.required],
    //     hoTenCmt: ['', Validators.required],
    //     ngaySinhCmt: ['', Validators.required],
    //     nguyenQuanCmt: ['', Validators.required],
    //     noiDKHKThuongTruCmt: ['', Validators.required],
    //     danTocCmt: ['', Validators.required],
    //     tonGiaoCmt: ['', Validators.required],
    //     dacDiemNhanDangCmt: ['', Validators.required],
    //     ngayCapCmt: ['', Validators.required],
    //     noiCapCmt: ['', Validators.required],
    //     nguoiKyCmt: ['', Validators.required],
    //   }),
    //   theCanCuoc: this.fb.group({
    //     soCanCuoc: ['', Validators.required],
    //     hoVaTenCanCuoc: ['', Validators.required],
    //     ngaySinhCanCuoc: ['', Validators.required],
    //     gioiTinhCanCuoc: ['', Validators.required],
    //     quocTichCanCuoc: ['', Validators.required],
    //     queQuanCanCuoc: ['', Validators.required],
    //     noiThuongTruCanCuoc: ['', Validators.required],
    //     giaTriDenCanCuoc: ['', Validators.required],
    //     dacDiemNhanDangCanCuoc: ['', Validators.required],
    //     ngayCapCanCuoc: ['', Validators.required],
    //     noiCapCanCuoc: ['', Validators.required],
    //     nguoiCapCanCuoc: ['', Validators.required],
    //   }),
    //   giayKhaiSinh: this.fb.group({
    //     xaPhuongGKS: ['', Validators.required],
    //     quanHuyenGKS: ['', Validators.required],
    //     tinhThanhGKS: ['', Validators.required],
    //     mauGKS: ['', Validators.required],
    //     soGKS: ['', Validators.required],
    //     quyenSoGKS: ['', Validators.required],
    //     hoTenGKS: ['', Validators.required],
    //     gioiTinhGKS: ['', Validators.required],
    //     ngaySinhGKS: ['', Validators.required],
    //     ngaySinhBangChuGKS: ['', Validators.required],
    //     noiSinhGKS: ['', Validators.required],
    //     danTocGKS: ['', Validators.required],
    //     quocTichGKS: ['', Validators.required],
    //     queQuanGKS: ['', Validators.required],
    //     hoTenChaGKS: ['', Validators.required],
    //     danTocChaGKS: ['', Validators.required],
    //     quocTichChaGKS: ['', Validators.required],
    //     hoTenMeGKS: ['', Validators.required],
    //     danTocMeGKS: ['', Validators.required],
    //     quocTichMeGKS: ['', Validators.required],
    //     hoTenNguoiDiKhaiSinhGKS: ['', Validators.required],
    //     quanHeVoiNguoiDuocKhaiSinhGKS: ['', Validators.required],
    //     ngayDangKyGKS: ['', Validators.required],
    //     canBoTuPhapKyGKS: ['', Validators.required],
    //     chuTichThayMatKyGKS: ['', Validators.required],
    //     ngayKyGKS: ['', Validators.required],
    //     chuTichKyGKS: ['', Validators.required],
    //   }),
    //   soHoKhau: this.fb.group({
    //     hoTenChuHoSHK: [''],
    //     soThanhVienSHK: [''],
    //     diaChiSHK: [''],
    //   }),
    //   bangCap: this.fb.group({
    //     bangCap: ['', Validators.required],
    //   }),
    //   hoChieu: this.fb.group({
    //     soHoChieu: ['', Validators.required],
    //   }),
    //   soYeuLyLich: this.fb.group({
    //     hoTenSYLL: [''],
    //     gioiTinhSYLL: [''],
    //     ngaySinhSYLL: [''],
    //     noiDangKyHKHienNaySYLL: [''],
    //     cmtSYLL: [''],
    //     noiCapCMTSYLL: [''],
    //     ngayCapCMTSYLL: [''],
    //     baoTinChoAiSYLL: [''],
    //     soSYLL: [''],
    //     kyHieuSYLL: [''],
    //     anhSYLL: [''],
    //   }),
    //   baoHiem: this.fb.group({
    //     maSoBaoHiem: [''],
    //   }),
    // });

    this.form = this.fb.group({
      loaiGiayTo: [{ id: 1, displayName: 'Chứng minh thư' }],
      chungMinhThu: this.fb.group({
        soCmt: [''],
        hoTenCmt: [''],
        ngaySinhCmt: [''],
        nguyenQuanCmt: [''],
        noiDKHKThuongTruCmt: [''],
        danTocCmt: [''],
        tonGiaoCmt: [''],
        dacDiemNhanDangCmt: [''],
        ngayCapCmt: [''],
        noiCapCmt: [''],
        nguoiKyCmt: [''],
      }),
      theCanCuoc: this.fb.group({
        soCanCuoc: [''],
        hoVaTenCanCuoc: [''],
        ngaySinhCanCuoc: [''],
        gioiTinhCanCuoc: [{ id: 1, displayName: 'Nam' }],
        quocTichCanCuoc: [''],
        queQuanCanCuoc: [''],
        noiThuongTruCanCuoc: [''],
        giaTriDenCanCuoc: [''],
        dacDiemNhanDangCanCuoc: [''],
        ngayCapCanCuoc: [''],
        noiCapCanCuoc: [''],
        nguoiCapCanCuoc: [''],
      }),
      giayKhaiSinh: this.fb.group({
        xaPhuongGKS: [''],
        quanHuyenGKS: [''],
        tinhThanhGKS: [''],
        mauGKS: [''],
        soGKS: [''],
        quyenSoGKS: [''],
        hoTenGKS: [''],
        gioiTinhGKS: [{ id: 1, displayName: 'Nam' }],
        ngaySinhGKS: [''],
        ngaySinhBangChuGKS: [''],
        noiSinhGKS: [''],
        danTocGKS: [''],
        quocTichGKS: [''],
        queQuanGKS: [''],
        hoTenChaGKS: [''],
        danTocChaGKS: [''],
        quocTichChaGKS: [''],
        hoTenMeGKS: [''],
        danTocMeGKS: [''],
        quocTichMeGKS: [''],
        hoTenNguoiDiKhaiSinhGKS: [''],
        quanHeVoiNguoiDuocKhaiSinhGKS: [''],
        ngayDangKyGKS: [''],
        canBoTuPhapKyGKS: [''],
        chuTichThayMatKyGKS: [''],
        ngayKyGKS: [''],
        chuTichKyGKS: [''],
      }),
      soHoKhau: this.fb.group({
        hoTenChuHoSHK: [''],
        soThanhVienSHK: [''],
        diaChiSHK: [''],
      }),
      bangCap: this.fb.group({
        bangCap: [''],
      }),
      hoChieu: this.fb.group({
        soHoChieu: [''],
      }),
      soYeuLyLich: this.fb.group({
        hoTenSYLL: [''],
        gioiTinhSYLL: [{ id: 1, displayName: 'Nam' }],
        ngaySinhSYLL: [''],
        noiDangKyHKHienNaySYLL: [''],
        cmtSYLL: [''],
        noiCapCMTSYLL: [''],
        ngayCapCMTSYLL: [''],
        baoTinChoAiSYLL: [''],
        soSYLL: [''],
        kyHieuSYLL: [''],
        anhSYLL: [''],
      }),
      baoHiem: this.fb.group({
        maSoBaoHiem: [''],
      }),
    });
  }

  save(): void {
    if (CommonComponent.getControlErr(this.form) === '') {
      this.getValueForSave();
      if (!this.id) {
        this.hoSoKhachHang.create(this.hoSoKhachHangDto).pipe(
          finalize(() => {
            this.saving = false;
          })
        ).subscribe(() => {
          this.showCreateMessage();
          this.bsModalRef.hide();
          this.onSave.emit();
        });
      } else {
        this.hoSoKhachHang.update(this.hoSoKhachHangDto).pipe(
          finalize(() => {
            this.saving = false;
          })
        ).subscribe(() => {
          this.showUpdateMessage();
          this.bsModalRef.hide();
          this.onSave.emit();
        });
      }
    }
  }

  setValueForEdit() {
    this.form.get('loaiGiayTo').setValue(this.arrChungMinhThu.find(e => e.id === this.hoSoKhachHangDto.loaiGiayTo));
    if (this.form.get('loaiGiayTo').value.id === 1) {
      this.form.get('chungMinhThu').get('soCmt').setValue(this.hoSoKhachHangDto.soCmt);
      this.form.get('chungMinhThu').get('hoTenCmt').setValue(this.hoSoKhachHangDto.hoTenCmt);
      this.form.get('chungMinhThu').get('ngaySinhCmt')
        .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngaySinhCmt));
      this.form.get('chungMinhThu').get('nguyenQuanCmt').setValue(this.hoSoKhachHangDto.nguyenQuanCmt);
      this.form.get('chungMinhThu').get('noiDKHKThuongTruCmt').setValue(this.hoSoKhachHangDto.noiDKHKThuongTruCmt);
      this.form.get('chungMinhThu').get('danTocCmt').setValue(this.hoSoKhachHangDto.danTocCmt);
      this.form.get('chungMinhThu').get('tonGiaoCmt').setValue(this.hoSoKhachHangDto.tonGiaoCmt);
      this.form.get('chungMinhThu').get('dacDiemNhanDangCmt').setValue(this.hoSoKhachHangDto.dacDiemNhanDangCmt);
      this.form.get('chungMinhThu').get('ngayCapCmt').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngayCapCmt));
      this.form.get('chungMinhThu').get('noiCapCmt').setValue(this.hoSoKhachHangDto.noiCapCmt);
      this.form.get('chungMinhThu').get('nguoiKyCmt').setValue(this.hoSoKhachHangDto.nguoiKyCmt);
    } else {
      this.form.get('theCanCuoc').get('soCanCuoc').setValue(this.hoSoKhachHangDto.soCanCuoc);
      this.form.get('theCanCuoc').get('hoVaTenCanCuoc').setValue(this.hoSoKhachHangDto.hoVaTenCanCuoc);
      this.form.get('theCanCuoc').get('ngaySinhCanCuoc')
        .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngaySinhCanCuoc));
      this.form.get('theCanCuoc').get('gioiTinhCanCuoc')
        .setValue(this.arrGioiTinh.find(e => e.id === this.hoSoKhachHangDto.gioiTinhCanCuoc));
      this.form.get('theCanCuoc').get('quocTichCanCuoc').setValue(this.hoSoKhachHangDto.quocTichCanCuoc);
      this.form.get('theCanCuoc').get('queQuanCanCuoc').setValue(this.hoSoKhachHangDto.queQuanCanCuoc);
      this.form.get('theCanCuoc').get('noiThuongTruCanCuoc').setValue(this.hoSoKhachHangDto.noiThuongTruCanCuoc);
      this.form.get('theCanCuoc').get('giaTriDenCanCuoc')
        .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.giaTriDenCanCuoc));
      this.form.get('theCanCuoc').get('dacDiemNhanDangCanCuoc').setValue(this.hoSoKhachHangDto.dacDiemNhanDangCanCuoc);
      this.form.get('theCanCuoc').get('ngayCapCanCuoc')
        .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngayCapCanCuoc));
      this.form.get('theCanCuoc').get('noiCapCanCuoc').setValue(this.hoSoKhachHangDto.noiCapCanCuoc);
      this.form.get('theCanCuoc').get('nguoiCapCanCuoc').setValue(this.hoSoKhachHangDto.nguoiCapCanCuoc);
    }

    this.form.get('giayKhaiSinh').get('xaPhuongGKS').setValue(this.hoSoKhachHangDto.xaPhuongGKS);
    this.form.get('giayKhaiSinh').get('quanHuyenGKS').setValue(this.hoSoKhachHangDto.quanHuyenGKS);
    this.form.get('giayKhaiSinh').get('tinhThanhGKS').setValue(this.hoSoKhachHangDto.tinhThanhGKS);
    this.form.get('giayKhaiSinh').get('mauGKS').setValue(this.hoSoKhachHangDto.mauGKS);
    this.form.get('giayKhaiSinh').get('soGKS').setValue(this.hoSoKhachHangDto.soGKS);
    this.form.get('giayKhaiSinh').get('quyenSoGKS').setValue(this.hoSoKhachHangDto.quyenSoGKS);
    this.form.get('giayKhaiSinh').get('hoTenGKS').setValue(this.hoSoKhachHangDto.hoTenGKS);
    this.form.get('giayKhaiSinh').get('gioiTinhGKS').setValue(this.arrGioiTinh.find(e => e.id === this.hoSoKhachHangDto.gioiTinhGKS));
    this.form.get('giayKhaiSinh').get('ngaySinhGKS')
      .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngaySinhGKS));
    this.form.get('giayKhaiSinh').get('ngaySinhBangChuGKS').setValue(this.hoSoKhachHangDto.ngaySinhBangChuGKS);
    this.form.get('giayKhaiSinh').get('noiSinhGKS').setValue(this.hoSoKhachHangDto.noiSinhGKS);
    this.form.get('giayKhaiSinh').get('danTocGKS').setValue(this.hoSoKhachHangDto.danTocGKS);
    this.form.get('giayKhaiSinh').get('quocTichGKS').setValue(this.hoSoKhachHangDto.quocTichGKS);
    this.form.get('giayKhaiSinh').get('queQuanGKS').setValue(this.hoSoKhachHangDto.queQuanGKS);
    this.form.get('giayKhaiSinh').get('hoTenChaGKS').setValue(this.hoSoKhachHangDto.hoTenChaGKS);
    this.form.get('giayKhaiSinh').get('danTocChaGKS').setValue(this.hoSoKhachHangDto.danTocChaGKS);
    this.form.get('giayKhaiSinh').get('quocTichChaGKS').setValue(this.hoSoKhachHangDto.quocTichChaGKS);
    this.form.get('giayKhaiSinh').get('hoTenMeGKS').setValue(this.hoSoKhachHangDto.hoTenMeGKS);
    this.form.get('giayKhaiSinh').get('danTocMeGKS').setValue(this.hoSoKhachHangDto.danTocMeGKS);
    this.form.get('giayKhaiSinh').get('quocTichMeGKS').setValue(this.hoSoKhachHangDto.quocTichMeGKS);
    this.form.get('giayKhaiSinh').get('hoTenNguoiDiKhaiSinhGKS').setValue(this.hoSoKhachHangDto.hoTenNguoiDiKhaiSinhGKS);
    this.form.get('giayKhaiSinh').get('quanHeVoiNguoiDuocKhaiSinhGKS').setValue(this.hoSoKhachHangDto.quanHeVoiNguoiDuocKhaiSinhGKS);
    this.form.get('giayKhaiSinh').get('ngayDangKyGKS')
      .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngayDangKyGKS));
    this.form.get('giayKhaiSinh').get('canBoTuPhapKyGKS').setValue(this.hoSoKhachHangDto.canBoTuPhapKyGKS);
    this.form.get('giayKhaiSinh').get('chuTichThayMatKyGKS').setValue(this.hoSoKhachHangDto.chuTichThayMatKyGKS);
    this.form.get('giayKhaiSinh').get('ngayKyGKS').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngayKyGKS));
    this.form.get('giayKhaiSinh').get('chuTichKyGKS').setValue(this.hoSoKhachHangDto.chuTichKyGKS);
    this.form.get('soHoKhau').get('hoTenChuHoSHK').setValue(this.hoSoKhachHangDto.hoTenChuHoSHK);
    this.form.get('soHoKhau').get('soThanhVienSHK').setValue(this.hoSoKhachHangDto.soThanhVienSHK);
    this.form.get('soHoKhau').get('diaChiSHK').setValue(this.hoSoKhachHangDto.diaChiSHK);
    this.form.get('bangCap').get('bangCap').setValue(this.hoSoKhachHangDto.bangCap);
    this.form.get('hoChieu').get('soHoChieu').setValue(this.hoSoKhachHangDto.soHoChieu);
    this.form.get('soYeuLyLich').get('hoTenSYLL').setValue(this.hoSoKhachHangDto.hoTenSYLL);
    this.form.get('soYeuLyLich').get('gioiTinhSYLL').setValue(this.arrGioiTinh.find(e => e.id === this.hoSoKhachHangDto.gioiTinhSYLL));
    this.form.get('soYeuLyLich').get('ngaySinhSYLL').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngaySinhSYLL));
    this.form.get('soYeuLyLich').get('noiDangKyHKHienNaySYLL').setValue(this.hoSoKhachHangDto.noiDangKyHKHienNaySYLL);
    this.form.get('soYeuLyLich').get('cmtSYLL').setValue(this.hoSoKhachHangDto.cmtSYLL);
    this.form.get('soYeuLyLich').get('noiCapCMTSYLL').setValue(this.hoSoKhachHangDto.noiCapCMTSYLL);
    this.form.get('soYeuLyLich').get('ngayCapCMTSYLL')
      .setValue(CommonComponent.getDateForEditFromMoment(this.hoSoKhachHangDto.ngayCapCMTSYLL));
    this.form.get('soYeuLyLich').get('baoTinChoAiSYLL').setValue(this.hoSoKhachHangDto.baoTinChoAiSYLL);
    this.form.get('soYeuLyLich').get('soSYLL').setValue(this.hoSoKhachHangDto.soSYLL);
    this.form.get('soYeuLyLich').get('kyHieuSYLL').setValue(this.hoSoKhachHangDto.kyHieuSYLL);
    this.form.get('soYeuLyLich').get('anhSYLL').setValue(this.hoSoKhachHangDto.anhSYLL);
    this.form.get('baoHiem').get('maSoBaoHiem').setValue(this.hoSoKhachHangDto.maSoBaoHiem);
  }

  getValueForSave() {
    this.hoSoKhachHangDto.loaiGiayTo = this.form.get('loaiGiayTo').value.id;
    if (this.form.get('loaiGiayTo').value.id === 1) {
      this.hoSoKhachHangDto.soCmt = this.form.get('chungMinhThu').get('soCmt').value;
      this.hoSoKhachHangDto.hoTenCmt = this.form.get('chungMinhThu').get('hoTenCmt').value;
      this.hoSoKhachHangDto.ngaySinhCmt = this.form.get('chungMinhThu').get('ngaySinhCmt').value;
      this.hoSoKhachHangDto.nguyenQuanCmt = this.form.get('chungMinhThu').get('nguyenQuanCmt').value;
      this.hoSoKhachHangDto.noiDKHKThuongTruCmt = this.form.get('chungMinhThu').get('noiDKHKThuongTruCmt').value;
      this.hoSoKhachHangDto.danTocCmt = this.form.get('chungMinhThu').get('danTocCmt').value;
      this.hoSoKhachHangDto.tonGiaoCmt = this.form.get('chungMinhThu').get('tonGiaoCmt').value;
      this.hoSoKhachHangDto.dacDiemNhanDangCmt = this.form.get('chungMinhThu').get('dacDiemNhanDangCmt').value;
      this.hoSoKhachHangDto.ngayCapCmt = this.form.get('chungMinhThu').get('ngayCapCmt').value;
      this.hoSoKhachHangDto.noiCapCmt = this.form.get('chungMinhThu').get('noiCapCmt').value;
      this.hoSoKhachHangDto.nguoiKyCmt = this.form.get('chungMinhThu').get('nguoiKyCmt').value;
    } else {
      this.hoSoKhachHangDto.soCanCuoc = this.form.get('theCanCuoc').get('soCanCuoc').value;
      this.hoSoKhachHangDto.hoVaTenCanCuoc = this.form.get('theCanCuoc').get('hoVaTenCanCuoc').value;
      this.hoSoKhachHangDto.ngaySinhCanCuoc = this.form.get('theCanCuoc').get('ngaySinhCanCuoc').value;
      this.hoSoKhachHangDto.gioiTinhCanCuoc = this.form.get('theCanCuoc').get('gioiTinhCanCuoc').value?.id;
      this.hoSoKhachHangDto.quocTichCanCuoc = this.form.get('theCanCuoc').get('quocTichCanCuoc').value;
      this.hoSoKhachHangDto.queQuanCanCuoc = this.form.get('theCanCuoc').get('queQuanCanCuoc').value;
      this.hoSoKhachHangDto.noiThuongTruCanCuoc = this.form.get('theCanCuoc').get('noiThuongTruCanCuoc').value;
      this.hoSoKhachHangDto.giaTriDenCanCuoc = this.form.get('theCanCuoc').get('giaTriDenCanCuoc').value;
      this.hoSoKhachHangDto.dacDiemNhanDangCanCuoc = this.form.get('theCanCuoc').get('dacDiemNhanDangCanCuoc').value;
      this.hoSoKhachHangDto.ngayCapCanCuoc = this.form.get('theCanCuoc').get('ngayCapCanCuoc').value;
      this.hoSoKhachHangDto.noiCapCanCuoc = this.form.get('theCanCuoc').get('noiCapCanCuoc').value;
      this.hoSoKhachHangDto.nguoiCapCanCuoc = this.form.get('theCanCuoc').get('nguoiCapCanCuoc').value;
    }

    this.hoSoKhachHangDto.xaPhuongGKS = this.form.get('giayKhaiSinh').get('xaPhuongGKS').value;
    this.hoSoKhachHangDto.quanHuyenGKS = this.form.get('giayKhaiSinh').get('quanHuyenGKS').value;
    this.hoSoKhachHangDto.tinhThanhGKS = this.form.get('giayKhaiSinh').get('tinhThanhGKS').value;
    this.hoSoKhachHangDto.mauGKS = this.form.get('giayKhaiSinh').get('mauGKS').value;
    this.hoSoKhachHangDto.soGKS = this.form.get('giayKhaiSinh').get('soGKS').value;
    this.hoSoKhachHangDto.quyenSoGKS = this.form.get('giayKhaiSinh').get('quyenSoGKS').value;
    this.hoSoKhachHangDto.hoTenGKS = this.form.get('giayKhaiSinh').get('hoTenGKS').value;
    this.hoSoKhachHangDto.gioiTinhGKS = this.form.get('giayKhaiSinh').get('gioiTinhGKS').value?.id;
    this.hoSoKhachHangDto.ngaySinhGKS = this.form.get('giayKhaiSinh').get('ngaySinhGKS').value;
    this.hoSoKhachHangDto.ngaySinhBangChuGKS = this.form.get('giayKhaiSinh').get('ngaySinhBangChuGKS').value;
    this.hoSoKhachHangDto.noiSinhGKS = this.form.get('giayKhaiSinh').get('noiSinhGKS').value;
    this.hoSoKhachHangDto.danTocGKS = this.form.get('giayKhaiSinh').get('danTocGKS').value;
    this.hoSoKhachHangDto.quocTichGKS = this.form.get('giayKhaiSinh').get('quocTichGKS').value;
    this.hoSoKhachHangDto.queQuanGKS = this.form.get('giayKhaiSinh').get('queQuanGKS').value;
    this.hoSoKhachHangDto.hoTenChaGKS = this.form.get('giayKhaiSinh').get('hoTenChaGKS').value;
    this.hoSoKhachHangDto.danTocChaGKS = this.form.get('giayKhaiSinh').get('danTocChaGKS').value;
    this.hoSoKhachHangDto.quocTichChaGKS = this.form.get('giayKhaiSinh').get('quocTichChaGKS').value;
    this.hoSoKhachHangDto.hoTenMeGKS = this.form.get('giayKhaiSinh').get('hoTenMeGKS').value;
    this.hoSoKhachHangDto.danTocMeGKS = this.form.get('giayKhaiSinh').get('danTocMeGKS').value;
    this.hoSoKhachHangDto.quocTichMeGKS = this.form.get('giayKhaiSinh').get('quocTichMeGKS').value;
    this.hoSoKhachHangDto.hoTenNguoiDiKhaiSinhGKS = this.form.get('giayKhaiSinh').get('hoTenNguoiDiKhaiSinhGKS').value;
    this.hoSoKhachHangDto.quanHeVoiNguoiDuocKhaiSinhGKS = this.form.get('giayKhaiSinh').get('quanHeVoiNguoiDuocKhaiSinhGKS').value;
    this.hoSoKhachHangDto.ngayDangKyGKS = this.form.get('giayKhaiSinh').get('ngayDangKyGKS').value;
    this.hoSoKhachHangDto.canBoTuPhapKyGKS = this.form.get('giayKhaiSinh').get('canBoTuPhapKyGKS').value;
    this.hoSoKhachHangDto.chuTichThayMatKyGKS = this.form.get('giayKhaiSinh').get('chuTichThayMatKyGKS').value;
    this.hoSoKhachHangDto.ngayKyGKS = this.form.get('giayKhaiSinh').get('ngayKyGKS').value;
    this.hoSoKhachHangDto.chuTichKyGKS = this.form.get('giayKhaiSinh').get('chuTichKyGKS').value;
    this.hoSoKhachHangDto.hoTenChuHoSHK = this.form.get('soHoKhau').get('hoTenChuHoSHK').value;
    this.hoSoKhachHangDto.soThanhVienSHK = this.form.get('soHoKhau').get('soThanhVienSHK').value;
    this.hoSoKhachHangDto.diaChiSHK = this.form.get('soHoKhau').get('diaChiSHK').value;
    this.hoSoKhachHangDto.bangCap = this.form.get('bangCap').get('bangCap').value;
    this.hoSoKhachHangDto.soHoChieu = this.form.get('hoChieu').get('soHoChieu').value;
    this.hoSoKhachHangDto.hoTenSYLL = this.form.get('soYeuLyLich').get('hoTenSYLL').value;
    this.hoSoKhachHangDto.gioiTinhSYLL = this.form.get('soYeuLyLich').get('gioiTinhSYLL').value?.id;
    this.hoSoKhachHangDto.ngaySinhSYLL = this.form.get('soYeuLyLich').get('ngaySinhSYLL').value;
    this.hoSoKhachHangDto.noiDangKyHKHienNaySYLL = this.form.get('soYeuLyLich').get('noiDangKyHKHienNaySYLL').value;
    this.hoSoKhachHangDto.cmtSYLL = this.form.get('soYeuLyLich').get('cmtSYLL').value;
    this.hoSoKhachHangDto.noiCapCMTSYLL = this.form.get('soYeuLyLich').get('noiCapCMTSYLL').value;
    this.hoSoKhachHangDto.ngayCapCMTSYLL = this.form.get('soYeuLyLich').get('ngayCapCMTSYLL').value;
    this.hoSoKhachHangDto.baoTinChoAiSYLL = this.form.get('soYeuLyLich').get('baoTinChoAiSYLL').value;
    this.hoSoKhachHangDto.soSYLL = this.form.get('soYeuLyLich').get('soSYLL').value;
    this.hoSoKhachHangDto.kyHieuSYLL = this.form.get('soYeuLyLich').get('kyHieuSYLL').value;
    this.hoSoKhachHangDto.anhSYLL = this.form.get('soYeuLyLich').get('anhSYLL').value;
    this.hoSoKhachHangDto.maSoBaoHiem = this.form.get('baoHiem').get('maSoBaoHiem').value;
  }

  close() {
    this.bsModalRef.hide();
  }

}
