import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DemoComponent } from '@app/main/danh-muc/demo/demo.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'demo', component: DemoComponent,
                data: { permission: 'Pages.Demos' },
                canActivate: [AppRouteGuard]
            },
        ])
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class DanhMucRoutingModule { }
