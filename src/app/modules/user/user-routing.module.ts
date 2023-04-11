import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowingEquipmentComponent } from './pages/borrowing-equipment/borrowing-equipment.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { UserComponent } from './pages/user.component';
import {inject} from '@angular/core';
import { Router } from '@angular/router';

const authGuard = () => {
    const router = inject(Router);
  
    if (localStorage.getItem('user_token')) {
      return true;
    }
  
    // Redirect to the login page
    return router.parseUrl('/login');
};

const routes: Routes = [
    {   path: '', component: UserComponent,
        canActivate: [authGuard],
        children: [
            {   path: '',
                canActivateChild: [authGuard],
                children: [
                    { path: '', component: HomeComponent },
                    { path: 'equipments', component: EquipmentsComponent },
                    { path: 'my-requests', component: UserRequestComponent },
                    { path: 'borrowing-equipments', component: BorrowingEquipmentComponent },
                ]
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
