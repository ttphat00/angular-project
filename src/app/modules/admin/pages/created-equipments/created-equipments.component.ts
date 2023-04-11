import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { Equipment } from 'src/app/core/models/equipment';
import { EquipmentStatusService } from 'src/app/core/services/equipment-status/equipment-status.service';
import { EquipmentService } from 'src/app/core/services/equipment/equipment.service';
import {MatDialog} from '@angular/material/dialog';
import { EditEquipmentFormComponent } from '../../components/edit-equipment-form/edit-equipment-form.component';

@Component({
  selector: 'app-created-equipments',
  templateUrl: './created-equipments.component.html',
  styleUrls: ['./created-equipments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreatedEquipmentsComponent implements OnInit, AfterViewInit {

  openDialog(equipment: Equipment, event: Event) {
    event.stopPropagation();
    this.dialog.open(EditEquipmentFormComponent, {
      data: equipment,
    });
  }

  deleteEquipment(id: string, event: Event){
    event.stopPropagation();
    if(confirm('Do you want to delete this equipment?')){
      this.equipmentService.deleteEquipment(id)
        .subscribe(() => {
          this.dataSource.data = this.equipmentService.equipments as Equipment[];
        })
    }
  }

  displayedColumns: string[] = ['name', 'brand', 'type', 'status', 'createdAt', 'manage'];
  dataSource = new MatTableDataSource<Equipment>();

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement?: Equipment | null;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private equipmentService: EquipmentService,
    public equipmentStatusService: EquipmentStatusService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllEquipments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
  }

  getAllEquipments(){
    if(!this.equipmentService.equipments){
      this.equipmentService.getAllEquipments()
        .subscribe(() => {
          this.dataSource.data = this.equipmentService.equipments as Equipment[];
        })
      return;
    }

    this.dataSource.data = this.equipmentService.equipments as Equipment[];
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
