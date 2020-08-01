import { NgModule } from '@angular/core';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { DemoComponent } from '../../danh-muc/demo/demo.component';
import { CreateOrEditDemoDialogComponent } from '../../danh-muc/demo/create-or-edtit/create-or-edit-demo-dialog.component';

@NgModule({
    imports: [
        SharedModule,
        DanhMucRoutingModule
    ],
    declarations: [
        DemoComponent,
        CreateOrEditDemoDialogComponent,
    ],
})
export class DanhMucModule { }
