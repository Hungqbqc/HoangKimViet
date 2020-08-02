import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { HoSoComponent } from '../../ho-so/ho-so.component'
import { HoSoRoutingModule } from './ho-so-routing.module';
import { CreateOrEditHoSoComponent } from '@app/main/ho-so/create-or-edit-ho-so/create-or-edit-ho-so.component';

@NgModule({
    imports: [
        SharedModule,
        HoSoRoutingModule
    ],
    declarations: [
        HoSoComponent,
        CreateOrEditHoSoComponent
    ],
})
export class HoSoModule { }
