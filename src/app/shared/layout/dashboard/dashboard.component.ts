import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user?: User;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.userService.getProfile(localStorage.getItem('admin_token') as string)
      .subscribe(user => {
        this.user = user;
      })
  }
  
  logout(): void{
    this.authService.logout();
    localStorage.removeItem('admin_token');
    this.router.navigate([this.authService.redirectUrl]);
  }
}
