import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { AdminComponent } from './pages/admin.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AssigningEquipmentsComponent } from './pages/assigning-equipments/assigning-equipments.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { CreatedEquipmentsComponent } from './pages/created-equipments/created-equipments.component';
import { SharedModule } from '../../shared/shared.module';
import { EditEquipmentFormComponent } from './components/edit-equipment-form/edit-equipment-form.component';
import { AcceptRequestFormComponent } from './components/accept-request-form/accept-request-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    AccountsComponent,
    CreateAccountComponent,
    AddEquipmentComponent,
    AssigningEquipmentsComponent,
    RequestsComponent,
    CreatedEquipmentsComponent,
    EditEquipmentFormComponent,
    AcceptRequestFormComponent,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class AdminModule { }
