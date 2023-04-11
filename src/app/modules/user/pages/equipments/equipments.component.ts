import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/core/models/equipment';
import { EquipmentService } from 'src/app/core/services/equipment/equipment.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { RequestStatusService } from 'src/app/core/services/request-status/request-status.service';
import { RequestTypeService } from 'src/app/core/services/request-type/request-type.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent {
  requestStatusId?: string;
  requestTypeId?: string;
  type?: string | null;
  brand?: string | null;
  equipments: Equipment[] = [];
  filterEquipments: Equipment[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private requestStatusService: RequestStatusService,
    private requestTypeService: RequestTypeService,
  ){}

  ngOnInit(): void {
    this.getAllEquipments();
    this.getDefaultRequestStatus();
    this.getDefaultRequestType();
  }

  getFilterEquipments(){
    this.route.queryParamMap
      .subscribe(params => {
        this.type = params.get('type');
        this.brand = params.get('brand');
        
        if(!this.brand){
          this.filterEquipments = this.equipments.filter(equipment => equipment.brandId.deviceTypeId.name===this.type);
          return;
        }

        this.filterEquipments = this.equipments.filter(equipment => equipment.brandId.deviceTypeId.name===this.type && equipment.brandId.name===this.brand);
      })
  }

  getAllEquipments(){
    this.equipmentService.getAllEquipments()
      .subscribe(equipments => {
        this.equipments = equipments;
        this.getFilterEquipments();
      })
  }

  getDefaultRequestStatus(){
    this.requestStatusService.getAllStatus()
      .subscribe(statuses => {
        this.requestStatusId = (statuses.filter(status => status.name==='Pending'))[0]._id;
      })
  }

  getDefaultRequestType(){
    this.requestTypeService.getAllTypes()
      .subscribe(types => {
        this.requestTypeId = (types.filter(type => type.name==='Borrow'))[0]._id;
      })
  }

  sendBorrowingRequest(equipmentId: string){
    this.requestService.createBorrowingRequest(this.requestStatusId as string, equipmentId, this.requestTypeId as string)
      .subscribe(request => {
        //...
      })
  }
}
