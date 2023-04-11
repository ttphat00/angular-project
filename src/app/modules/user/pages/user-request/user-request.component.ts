import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/core/models/request';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {
  requests: Request[] = [];

  constructor(
    private requestService: RequestService
  ){}

  ngOnInit(): void {
    this.getMyRequests();
  }

  getMyRequests(){
    this.requestService.getUserBorrowingRequests()
      .subscribe(requests => {
        this.requests = requests;
      })
  }

  deleteBorrowingRequest(request: Request){
    if(confirm('Do you want to cancel this request?')){
      this.requests = this.requests.filter(req => req !== request);
      this.requestService.deleteBorrowingRequest(request._id)
        .subscribe();
    }
  }
}
