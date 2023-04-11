import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EquipmentTypeService } from 'src/app/core/services/equipment-type/equipment-type.service';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { EquipmentType } from 'src/app/core/models/equipment-type';
import { Brand } from 'src/app/core/models/brand';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  types: EquipmentType[] = [];
  brands: Brand[] = [];
  user?: User;

  constructor(
    private authService: AuthService, 
    private router: Router,
    public equipmentTypeService: EquipmentTypeService,
    private brandService: BrandService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllTypes();
    this.getProfile();
  }

  getProfile(){
    this.userService.getProfile(localStorage.getItem('user_token') as string)
      .subscribe(user => {
        this.user = user;
      })
  }

  getAllTypes(): void{
    if(!this.equipmentTypeService.equipmentTypes){
      this.equipmentTypeService.getTypes()
        .subscribe()
    }
  }

  getAllBrands(): void{
    if(!this.brandService.brands){
      this.brandService.getBrands()
        .subscribe()
    }
  }

  getFilterBrands(typeId: string){
    return this.brandService.brands?.filter(brand => brand.deviceTypeId._id===typeId);
  }
  
  logout(): void{
    this.authService.logout();
    localStorage.removeItem('user_token');
    this.router.navigate([this.authService.redirectUrl]);
  }
}
