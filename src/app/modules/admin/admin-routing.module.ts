import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { AdminComponent } from './pages/admin.component';
import { AssigningEquipmentsComponent } from './pages/assigning-equipments/assigning-equipments.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CreatedEquipmentsComponent } from './pages/created-equipments/created-equipments.component';
import { RequestsComponent } from './pages/requests/requests.component';
import {inject} from '@angular/core';
import { Router } from '@angular/router';

const authGuard = () => {
    const router = inject(Router);
  
    if (localStorage.getItem('admin_token')) {
      return true;
    }
  
    // Redirect to the login page
    return router.parseUrl('/login');
};

const routes: Routes = [
    {   path: 'admin', component: AdminComponent,
        canActivate: [authGuard],
        children: [
            {   path: '',
                canActivateChild: [authGuard],
                children: [
                    { path: 'accounts', component: AccountsComponent },
                    { path: 'create-account', component: CreateAccountComponent },
                    { path: 'add-equipment', component: AddEquipmentComponent },
                    { path: 'equipments', component: CreatedEquipmentsComponent },
                    { path: 'requests', component: RequestsComponent },
                    { path: 'assigning-equipments', component: AssigningEquipmentsComponent },
                ]
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
