import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                ],
            },
            {
                path: 'danh-muc',
                loadChildren: () => import('./main-module/danh-muc/danh-muc.module').then((m) => m.DanhMucModule),
            },    
            {
                path: 'ho-so',
                loadChildren: () => import('./main-module/ho-so/ho-so.module').then((m) => m.HoSoModule),
            },    
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule { }
