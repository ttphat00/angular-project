import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { BorrowingServiceService } from 'src/app/core/services/borrowing-service/borrowing-service.service';
import { BorrowingEquipment } from 'src/app/core/models/borrowing-equipment';

@Component({
  selector: 'app-assigning-equipments',
  templateUrl: './assigning-equipments.component.html',
  styleUrls: ['./assigning-equipments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssigningEquipmentsComponent implements OnInit, AfterViewInit { 
  displayedColumns: string[] = ['equipment', 'brand', 'type', 'user', 'fromTime', 'toTime'];
  dataSource = new MatTableDataSource<BorrowingEquipment>();

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement?: BorrowingEquipment | null;

  // selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private borrowingEquipmentService: BorrowingServiceService,
  ) {}

  ngOnInit(): void {
    this.getAllBorrowingEquipments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
  }

  getAllBorrowingEquipments(){
    if(!this.borrowingEquipmentService.borrowingEquipments){
      this.borrowingEquipmentService.getAllBorrowingEquipments()
        .subscribe(() => {
          this.dataSource.data = this.borrowingEquipmentService.borrowingEquipments as BorrowingEquipment[];
        })
      return;
    }

    this.dataSource.data = this.borrowingEquipmentService.borrowingEquipments as BorrowingEquipment[];
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
