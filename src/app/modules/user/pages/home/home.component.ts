import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/core/models/equipment';
import { EquipmentService } from 'src/app/core/services/equipment/equipment.service';
import { RequestStatusService } from 'src/app/core/services/request-status/request-status.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { RequestTypeService } from 'src/app/core/services/request-type/request-type.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requestStatusId?: string;
  requestTypeId?: string;
  equipments: Equipment[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private requestService: RequestService,
    private requestStatusService: RequestStatusService,
    private requestTypeService: RequestTypeService,
  ){}

  ngOnInit(): void {
    this.getAllEquipments();
    this.getDefaultRequestStatus();
    this.getDefaultRequestType();
  }

  getAllEquipments(){
    if(!this.equipmentService.equipments){
      this.equipmentService.getAllEquipments()
        .subscribe(equipments => {
          this.equipments = equipments.filter(equipment => equipment.statusId.name==='Un-used');
        })
      return;
    }
    this.equipments = this.equipmentService.equipments.filter(equipment => equipment.statusId.name==='Un-used');
  }

  getDefaultRequestStatus(){
    if(!this.requestStatusService.requestStatus){
      this.requestStatusService.getAllStatus()
        .subscribe(statuses => {
          this.requestStatusId = (statuses.filter(status => status.name==='Pending'))[0]._id;
        })
      return;
    }
    this.requestStatusId = (this.requestStatusService.requestStatus.filter(status => status.name==='Pending'))[0]._id;
  }

  getDefaultRequestType(){
    this.requestTypeService.getAllTypes()
      .subscribe(types => {
        this.requestTypeId = (types.filter(type => type.name==='Borrow'))[0]._id;
      })
  }

  sendBorrowingRequest(equipmentId: string){
    this.requestService.createBorrowingRequest(this.requestStatusId as string, equipmentId, this.requestTypeId as string)
      .subscribe()
  }
}
