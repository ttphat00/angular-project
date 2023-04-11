import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Brand } from 'src/app/core/models/brand';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { EquipmentTypeService } from 'src/app/core/services/equipment-type/equipment-type.service';
import { EquipmentService } from 'src/app/core/services/equipment/equipment.service';
import { EquipmentStatusService } from 'src/app/core/services/equipment-status/equipment-status.service';
import { EquipmentStatus } from 'src/app/core/models/equipment-status';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  private statusId?: string;
  private fileSource?: File;
  filterBrands: Brand[] = [];

  addEquipmentForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: ['', [Validators.required]],
    brand: ['', [Validators.required]],
  });

  get name() {
    return this.addEquipmentForm.get("name"); 
  }

  get description() {
    return this.addEquipmentForm.get("description");
  }

  get image() {
    return this.addEquipmentForm.get("image");
  }

  get type() {
    return this.addEquipmentForm.get("type");
  }

  get brand() {
    return this.addEquipmentForm.get("brand");
  }

  constructor(
    private fb: FormBuilder, 
    public equipmentTypeService: EquipmentTypeService,
    private brandService: BrandService,
    private equipmentService: EquipmentService,
    private equipmentStatusService: EquipmentStatusService,
  ) { }

  ngOnInit(): void {
    this.getDefaultStatus();
    this.getTypes();
    this.getAllBrands();
    this.type?.valueChanges.subscribe(selectedValue => {
      this.getFilterBrands();
    });
  }

  getTypes(): void {
    if(!this.equipmentTypeService.equipmentTypes){
      this.equipmentTypeService.getTypes()
          .subscribe();
    }
  }

  getAllBrands(): void{
    if(!this.brandService.brands){
      this.brandService.getBrands()
        .subscribe()
    }
  }

  getFilterBrands(): void{
    this.filterBrands = this.brandService.brands?.filter(brand => brand.deviceTypeId._id === this.type?.value) as Brand[];
    this.brand?.setValue('');
  }

  onFileChange(event: Event) {
    if (((event.target as HTMLInputElement).files as FileList).length > 0) {
      this.fileSource = ((event.target as HTMLInputElement).files as FileList)[0];
    }
  }

  getDefaultStatus(){
    if(!this.equipmentStatusService.equipmentStatus){
      this.equipmentStatusService.getAllStatus()
        .subscribe(status => {
          this.statusId = (status.filter(sts => sts.name==='Un-used'))[0]._id;
        })
      return;
    }

    this.statusId = ((this.equipmentStatusService.equipmentStatus?.filter(sts => sts.name==='Un-used')) as EquipmentStatus[])[0]._id;
  }

  addEquipment(formData: FormData){
    this.equipmentService.addEquipment(formData)
      .subscribe(equipment => {
        if(equipment){
          this.addEquipmentForm.reset();
          this.equipmentService.equipments?.push(equipment);
        }
      });
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('file', this.fileSource as File);
    formData.append('name', this.name?.value as string);
    formData.append('description', this.description?.value as string);
    formData.append('brandId', this.brand?.value as string);
    formData.append('statusId', this.statusId as string);
    formData.append('createdAt', (new Date()).toDateString() );
    formData.append('updatedAt', (new Date()).toDateString());

    this.addEquipment(formData);
  }
}