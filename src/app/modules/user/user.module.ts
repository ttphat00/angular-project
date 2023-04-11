import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BorrowingEquipmentComponent } from './pages/borrowing-equipment/borrowing-equipment.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { UserComponent } from './pages/user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    HomeComponent, 
    UserComponent,
    EquipmentsComponent,
    UserRequestComponent,
    BorrowingEquipmentComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class UserModule { }
