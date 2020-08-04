import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { Table } from 'primeng/table';
import { FormGroup, FormControl } from '@angular/forms';
import { DemoForView, DemoGetAllInputDto, DemoServiceProxy, DemoDto, HoSoKhachHangServiceProxy, HoSoKhachHangDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { FileDownloadService } from '@shared/file-download.service';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { CreateOrEditDemoDialogComponent } from '../danh-muc/demo/create-or-edtit/create-or-edit-demo-dialog.component';
import { ImportExcelDialogComponent } from '@shared/components/import-excel/import-excel-dialog.component';
import { CreateOrEditHoSoComponent } from './create-or-edit-ho-so/create-or-edit-ho-so.component';

@Component({
  selector: 'app-ho-so',
  templateUrl: './ho-so.component.html',
  styleUrls: ['./ho-so.component.scss'],
  animations: [appModuleAnimation()],
})
export class HoSoComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  form: FormGroup;
  keyword = '';
  advancedFiltersVisible = false;
  isActive = false;
  loading = true;
  exporting = false;
  hoSoKhachHangs: HoSoKhachHangDto[] = [];
  input: DemoGetAllInputDto;
  totalCount = 0;
  config = {
    animated: false
  };
  arrGioiTinh = [
    { id: 1, displayName: 'Nam' },
    { id: 2, displayName: 'Nữ' },
    { id: 3, displayName: 'Khác' }
  ];
  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    public http: HttpClient,
    private _fileDownloadService: FileDownloadService,
    private hoSoKhachHang: HoSoKhachHangServiceProxy,

  ) { super(injector); }

  ngOnInit(): void {
    this.khoiTaoForm();
    this.themMoi();
  }

  khoiTaoForm() {
    this.form = new FormGroup({
      TextInput1: new FormControl(),
      TextInput2: new FormControl()
    });
  }

  getDataPage(lazyLoad?: LazyLoadEvent) {
    this.loading = true;
    this.hoSoKhachHang.getAll(
      undefined,
      lazyLoad ? lazyLoad.first : this.table.first,
      lazyLoad ? lazyLoad.rows : this.table.rows,
    ).pipe(finalize(() => { this.loading = false; }))
      .subscribe(result => {
        this.hoSoKhachHangs = result.items;
        this.totalCount = result.totalCount;
      });
  }

  themMoi(id?: number, isView = false) {
    this.showCreateOrEditDialog(id, isView);
  }

  xem(id?: number) {
    this.showCreateOrEditDialog(id, true);
  }

  exportToExcel() {
    // this.exporting = true;
    // this.input = new DemoGetAllInputDto();
    // this.input.skipCount = 0;
    // this.input.maxResultCount = 10000000;
    // this._demoService.exportToExcel(this.input).subscribe((result) => {
    //   this._fileDownloadService.downloadTempFile(result);
    //   this.exporting = false;
    // }, () => {
    //   this.exporting = false;
    // });
  }

  importExcel() {
    // this.showImportDemoDialog();
  }

  layGioiTinh(id) {
    return this.arrGioiTinh.find(e => e.id === id).displayName;
  }

  protected xoa(item: HoSoKhachHangDto) {
    this.swal.fire({
      title: 'Bạn chắc chắn không?',
      text: 'Hồ sơ ' + item.hoTenGKS + ' sẽ bị xóa.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.confirmButtonColor,
      cancelButtonColor: this.cancelButtonColor,
      cancelButtonText: this.cancelButtonText,
      confirmButtonText: this.confirmButtonText
    }).then((result) => {
      if (result.value) {
        this.hoSoKhachHang.delete(item.id).subscribe(() => {
          this.showDeleteMessage();
          this.getDataPage();
        });
      }
    });
  }

  private showCreateOrEditDialog(id?: number, isView = false): void {
    // copy
    let createOrEditDialog: BsModalRef;
    createOrEditDialog = this._modalService.show(
      CreateOrEditHoSoComponent,
      {
        class: 'modal-xl',
        initialState: {
          id,
          isView,
        },
      }
    );

    // ouput emit
    createOrEditDialog.content.onSave.subscribe(() => {
      this.getDataPage();
    });
  }

  private showImportDemoDialog(): void {
    // let createOrEditUserDialog: BsModalRef;

    // createOrEditUserDialog = this._modalService.show(
    //   ImportExcelDialogComponent,
    //   {
    //     class: 'modal-lg',
    //     initialState: {
    //       maxFile: 1,
    //       excelAcceptTypes: this.excelAcceptTypes
    //     }
    //   }
    // );

    // // Tải file mẫu
    // createOrEditUserDialog.content.onDownload.subscribe(() => {
    //   this._demoService.downloadFileMau().subscribe(result => {
    //     createOrEditUserDialog.content.downLoading = false;
    //     this._fileDownloadService.downloadTempFile(result);
    //   });
    // });

    // // Upload
    // createOrEditUserDialog.content.onSave.subscribe((ouput) => {
    //   createOrEditUserDialog.content.returnMessage = 'Đang upload file....';
    //   const formdata = new FormData();
    //   for (let i = 0; i < ouput.length; i++) {
    //     formdata.append((i + 1) + '', ouput[i]);
    //   }
    //   this.http.post(URL, formdata).subscribe((res) => {
    //     this._demoService.importFileExcel(res['result'][0]).subscribe((message) => {
    //       createOrEditUserDialog.content.returnMessage = message;
    //       createOrEditUserDialog.content.uploading = false;
    //       this.showUploadMessage();
    //     });
    //   });
    // });

    // // Close
    // createOrEditUserDialog.content.onClose.subscribe(() => {
    //   this.getDataPage();
    // });
  }

}
