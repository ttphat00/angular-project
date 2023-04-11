import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Request } from 'src/app/core/models/request';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RequestStatusService } from 'src/app/core/services/request-status/request-status.service';
import { EquipmentStatusService } from 'src/app/core/services/equipment-status/equipment-status.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { EquipmentService } from 'src/app/core/services/equipment/equipment.service';
import { BorrowingServiceService } from 'src/app/core/services/borrowing-service/borrowing-service.service';
import { BorrowingEquipment } from 'src/app/core/models/borrowing-equipment';

@Component({
  selector: 'app-accept-request-form',
  templateUrl: './accept-request-form.component.html',
  styleUrls: ['./accept-request-form.component.css']
})
export class AcceptRequestFormComponent implements OnInit {
  requestStatusId?: string;
  equipmentStatusId?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Request, 
    private fb: FormBuilder, 
    private requestStatusService: RequestStatusService,
    private equipmentStatusService: EquipmentStatusService,
    private requestService: RequestService,
    private equipmentService: EquipmentService,
    private borrowingServiceService: BorrowingServiceService,
  ) {}

  acceptRequestForm = this.fb.group({
    fromDate: ['', [Validators.required]],
    toDate: ['', [Validators.required]],
  });

  get fromDate() {
    return this.acceptRequestForm.get("fromDate"); 
  }

  get toDate() {
    return this.acceptRequestForm.get("toDate"); 
  }

  ngOnInit(): void {
    this.getAcceptedRequestStatus();
    this.getInUseEquipmentStatus();
  }

  getAcceptedRequestStatus(){
    if(!this.requestStatusService.requestStatus){
      this.requestStatusService.getAllStatus()
        .subscribe(statuses => {
          this.requestStatusId = (statuses.filter(status => status.name==='Accepted'))[0]._id;
        })
      return;
    }
    this.requestStatusId = (this.requestStatusService.requestStatus.filter(status => status.name==='Accepted'))[0]._id;
  }

  getInUseEquipmentStatus(){
    if(!this.equipmentStatusService.equipmentStatus){
      this.equipmentStatusService.getAllStatus()
        .subscribe(statuses => {
          this.equipmentStatusId = (statuses.filter(status => status.name==='In-use'))[0]._id;
        })
      return;
    }
    this.equipmentStatusId = (this.equipmentStatusService.equipmentStatus.filter(status => status.name==='In-use'))[0]._id;
  }


  onSubmit(){
    const borrowingEquipment: BorrowingEquipment = {
      _id: '',
      userId: this.data.createdBy,
      equipmentId: this.data.equipmentId,
      fromTime: new Date(this.fromDate?.value as string),
      toTime: new Date(this.toDate?.value as string),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.borrowingServiceService.createBorrowingEquipment(borrowingEquipment)
      .subscribe()

    this.equipmentService.updateEquipmentStatus(this.data.equipmentId._id, this.equipmentStatusId as string)
      .subscribe()
      
    this.requestService.updateRequestStatus(this.data._id, this.requestStatusId as string)
      .subscribe()
  }
}
