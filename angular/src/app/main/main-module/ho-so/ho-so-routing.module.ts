import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRouteGuard } from '../../../../shared/auth/auth-route-guard';
import {HoSoComponent} from '../../ho-so/ho-so.component'
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'ho-so-khach-hang', component: HoSoComponent,
                data: { permission: 'Pages.Demos' },
                canActivate: [AppRouteGuard]
            },
        ])
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class HoSoRoutingModule { }
