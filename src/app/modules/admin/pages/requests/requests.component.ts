import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Request } from 'src/app/core/models/request';
import { RequestService } from 'src/app/core/services/request/request.service';
import {MatDialog} from '@angular/material/dialog';
import { AcceptRequestFormComponent } from '../../components/accept-request-form/accept-request-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RequestsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'brand', 'type', 'user', 'status', 'manage'];
  dataSource = new MatTableDataSource<Request>();

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement?: Request | null;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public requestService: RequestService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
  ){}

  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests(){
    if(!this.requestService.requests){
      this.requestService.getAllBorrowingRequests()
        .subscribe(() => {
          this.dataSource.data = this.requestService.requests as Request[];
        })
      return;
    }
    this.dataSource.data = this.requestService.requests as Request[];
  }

  openDialog(request: Request, event: Event) {
    event.stopPropagation();
    this.dialog.open(AcceptRequestFormComponent, {
      data: request,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
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
