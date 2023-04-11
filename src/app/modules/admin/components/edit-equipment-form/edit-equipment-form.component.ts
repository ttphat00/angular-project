import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EquipmentStatusService } from 'src/app/core/services/equipment-status/equipment-status.service';
import { EquipmentService } from 'src/app/core/services/equipment/equipment.service';

@Component({
  selector: 'app-edit-equipment-form',
  templateUrl: './edit-equipment-form.component.html',
  styleUrls: ['./edit-equipment-form.component.css']
})
export class EditEquipmentFormComponent {
  private fileSource?: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Equipment, 
    private fb: FormBuilder, 
    public equipmentStatusService: EquipmentStatusService,
    private equipmentService: EquipmentService
  ) {}

  editEquipmentForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: [''],
    status: ['', [Validators.required]],
  });

  get name() {
    return this.editEquipmentForm.get("name"); 
  }

  get description() {
    return this.editEquipmentForm.get("description");
  }

  get image() {
    return this.editEquipmentForm.get("image");
  }

  get status() {
    return this.editEquipmentForm.get("status");
  }

  ngOnInit(): void {
    this.getAllStatus();
    this.name?.setValue(this.data.name);
    this.description?.setValue(this.data.description);
    this.status?.setValue(this.data.statusId._id);
  }

  getAllStatus(){
    if(!this.equipmentStatusService.equipmentStatus){
      this.equipmentStatusService.getAllStatus()
        .subscribe()
    }
  }

  onFileChange(event: Event) {
    if (((event.target as HTMLInputElement).files as FileList).length > 0) {
      this.fileSource = ((event.target as HTMLInputElement).files as FileList)[0];
    }
  }

  onSubmit(id:string){
    const formData = new FormData();

    formData.append('file', this.fileSource as File);
    formData.append('name', this.name?.value as string);
    formData.append('description', this.description?.value as string);
    formData.append('statusId', this.status?.value as string);
    formData.append('updatedAt', (new Date()).toDateString());
    
    this.equipmentService.updateEquipment(id, formData)
      .subscribe()
  }
}
